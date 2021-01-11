const puppeteer = require('puppeteer');
const faker = require('faker');

const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

let browser, page, fields;

const config = {
  headless: false,
  devtools: false,
  slowMo: 50,
  args: [
    `--window-size=600,900`
  ]
};

const pageConfig = {
  'waitUntil': 'domcontentloaded' 
};

const URL = 'https://kodaktor.ru/g/puppetform';

before(async () => {
  return new Promise(async (resolve) => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
    await page.setViewport({ width: 600, height: 700 });
    await page.goto(URL, pageConfig);
    resolve();
  });
});

describe('Contact form', () => {
  it('lead can submit a contact request', async () => {
    await page.waitForSelector('[data-test=contact-form]');
    await page.click('input[name=name]');
    await page.type('input[name=name]', lead.name);
    await page.click('input[name=email]');
    await page.type('input[name=email]', lead.email);
    await page.click('input[name=tel]');
    await page.type('input[name=tel]', lead.phone);
    await page.click('textarea[name=message]');
    await page.type('textarea[name=message]', lead.message);
    await page.click('input[type=checkbox]');
    await page.click('button[type=submit]');
    await page.waitForSelector('.modal');
  });
});
