// const assert = require('chai').assert
//
// describe('our test bundle', function () {
//   it('should work', function () {
//     assert(true)
//     })
//   })


const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');


describe('testing ideabox',()=>{
  let driver

  test.beforeEach(()=> {
    // this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  });

  // test.afterEach(()=> {
  //   driver.quit();
  // });

  test.it('should allow me to add a title', ()=>{
    const title = driver.findElement({ className: 'idea-title'});
    title.sendKeys('test test test');
  })
})
