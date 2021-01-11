'use strict';

const TEMPLATEJSON = './test/kramer_tests_set_client';
const puppeteer = require('puppeteer');

const config = {
  headless: false,
  devtools: false
};

const pageConfig = {
  'waitUntil': 'domcontentloaded' 
};

(async () => {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();

  const { url, data } = (!process.argv[2]) ?  require(TEMPLATEJSON)  : require(`./${process.argv[2]}`);
  
  const goURL = url => new Promise(async (resolve) => {
    await page.goto(url, pageConfig);
    console.log('goURL');
    return resolve({ el:'#button' });
  });
  
  const doClick = options => {
    console.log('doClick', options);
    return page.$eval(options.el , el => el.click());
  }
  
  const final = () => page.title();

  data.forEach(async ({ input }) => {
    goURL(url + input)
    .then(doClick)
    .then(final)
    .then((res) => {
      console.log('res', res);
    });
  });
  
  // await page.$eval('#inp', el => el.value = 'Hello World!');
  // await page.$eval('#button_do', el => el.click());
  // const answer = await page.$eval('#ans', el => el.value);
  // console.log('answer', answer);
})();


//       page  = new  Zombie(),
//       jsncnt = (!process.argv[2]) ?  require(TEMPLATEJSON)  : require(`./${process.argv[2]}`),
//       goURL = url=> new Promise(resolve=>page.visit(url, resolve.bind(null, {el:'#button'}))),
//       doClick = options=> new Promise(resolve=>page.pressButton(options.el, resolve)),
//       final = ()=>JSON.parse(page.document.title) 
// 	  ;
// page.silent = true;
// jsncnt.data.forEach( query=> describe('#solve system', ()=> {
//   	    	    				it('respond with result', ()=>
//   	    	      		  			goURL(jsncnt.url+query.input).then(doClick).then(final).should.eventually.have
//   	    	           	  			.property('result', query.output.result)
//   	    	    				);
//   	   						 })
//   	   			   );