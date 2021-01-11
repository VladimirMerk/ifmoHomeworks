/*jshint esversion: 6 */

const should = require('should');
const puppeteer = require('puppeteer');

const TEMPLATEJSON = './kramer_tests_set_client';

const config = {
  headless: false,
  devtools: false
};

const pageConfig = {
  'waitUntil': 'domcontentloaded' 
};

let browser;
let page;

const { url, data } = (!process.argv[2]) ?  require(TEMPLATEJSON)  : require(`./${process.argv[2]}`);

const goURL = url => new Promise(async (resolve) => {
  await page.goto(url, pageConfig);
  return resolve({ el:'#button' });
});

const doClick = options => page.$eval(options.el , el => el.click());

const final = () => page.title();


before(() => {
  return new Promise(async (resolve) => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
    resolve();
  });
});

data.forEach(async ({ input, output: { result } }) => {
  describe('#solve system', () => {
    it('respond with result', () => {
      goURL(url + input)
      .then(doClick)
      .then(final)
      .should.eventually.have.property('result', result);
    });
  })
})
