'use strict';
const puppeteer = require('puppeteer');

const config = {
  headless: false,
  devtools: false,
  args: [
    `--window-size=600,900`
  ]
};

const pageConfig = {
  'waitUntil': 'domcontentloaded' 
};

const URL = 'https://kodaktor.ru/g/puppetform';

const emailField= {
  '@': false,
  'a@': false,
  '@a': false,
  'a@a': true
};

const textField = {
  'a': true,
  '0': true
}

const phoneField = {
  'a': true,
  '+7 900 000 00 00': true,
  '+7(900)000-00-00': true,
  '89000000000': true,
  '/\\-+': true,
}

const allowFieldsType = {
  'text': textField,
  'email': emailField,
  'tel': phoneField,
  'textarea': textField,
  'checkbox': ''
};

const testedFields = [
  'form .input',
  'form .textarea',
  'form .checkbox input'
];

(async () => {
  const [browser, page] = await initPuppeteer();

  const fields = await page.$$(testedFields.join(', '));

  fields.forEach(async (field, i) => {
    const fieldInfo = await field.evaluate(getFieldInfo);

    console.log(
      'Field type must be among an allowed', 
      Object.keys(allowFieldsType).includes(fieldInfo.type)
    );
    
    if (fieldInfo.required) {
      console.log(
        'The field cannot be empty', 
        await field.evaluate(checkRequired)
      );
    }

    getCases(fieldInfo.type)
    .forEach(async ([value, expectedResult]) => {
      console.log(
        `Field validation must be ${expectedResult} if the value is "${value}"`, 
        await field.evaluate(checkValue, value) === expectedResult
      );
    });
  });

})();

async function initPuppeteer() {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.setViewport({
    width: 600,
    height: 700,
  });

  await page.goto(URL, pageConfig);
  return [browser, page];
}

function checkRequired(el) {
  el.value = '';
  return el.checkValidity() === false;
}

function checkValue(el, value) {
  el.value = value;
  console.log('value', value);
  return el.checkValidity();
}

function getFieldInfo(el) {
  const result = {};
  ( { 
   ['tagName']: result['tagName'], 
   ['name']: result['name'], 
   ['type']: result['type'], 
   ['required']: result['required'] 
  } = el );
  return result;
}

function getCases(type) {
   return Object.entries(allowFieldsType[type]);
}
