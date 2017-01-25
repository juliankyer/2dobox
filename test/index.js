// const assert = require('chai').assert
//
// describe('our test bundle', function () {
//   it('should work', function () {
//     assert(true)
//     })
//   })


const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing')


test.describe('testing ideabox',()=>{
  this.timeout(10000);
  test.it('should allow me to add a title and a description', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get('http://localhost:8080');
  })
})
