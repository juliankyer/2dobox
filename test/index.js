const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('testing ideabox', function() {
  let driver

  test.beforeEach(()=> {
    this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  });

  test.afterEach(()=> {
    driver.quit();
  });

  test.it('should allow adding a title and a task', ()=> {
    const title = driver.findElement({ className: 'xxxxxx'});
    const task = driver.findElement({ className: 'xxxxxxx'});

    title.sendKeys('This is a title')
      title.getAttribute('value').then((value)=> {
      assert.equal(value, 'This is a title');
    });
    task.sendKeys('This is a task');
    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'This is a task');
    });
  });

  test.it('should allow saving a task to the dom when save is clicked', ()=> {
    const title = driver.findElement({ className: 'xxxxxxx'});
    const task = driver.findElement({ className: 'xxxxxxx'});
    const button = driver.findElement({ className: 'xxxxxxx'});

    title.sendKeys('Test title')
    task.sendKeys('Test Task')
    button.click();

    const uniqueTask = driver.findElement({         })
  });

  test.it('should clear input fields after save is clicked', ()=> {

  });

  test.it('should persist saved tasks when refreshed', ()=> {

  });


  test.it('when delete is clicked, the corresponding task should be removed from DOM', ()=> {

  });

  test.it('when task is deleted, it should not persist on browser refresh', ()=> {

  });

  test.it('existing task body and title should be editable, and changes should persist on focus-out/enter', ()=> {

  });

  test.it('edited task body and title should persist on refresh', ()=> {

  });

  test.it('should have a live-search feature for filtering through ideas', ()=> {

  });

  test.it('when completed task is clicked, state of task should change', ()=> {

  });

  test.it('when browser is refreshed, completed tasks should not be displayed', ()=> {

  });

  test.it('should have a "show completed todos" button that displays hidden, completed tasks at the top of the list', ()=> {

  });

  test.it('task should have a default importance of normal', ()=> {

  });

  test.it('task importance should be upvoteable', ()=> {

  });

  test.it('task importance should be downvoteable', ()=> {

  });

  test.it('task importance should persist on page refresh', ()=> {

  });

  // PHASE THREE TESTS UNDER HERE
});
