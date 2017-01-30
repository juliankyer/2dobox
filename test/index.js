const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('testing ToDo Box', function() {
  let driver;

  this.timeout(10000);
  test.beforeEach(()=> {
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  });

  test.afterEach(()=> {
    driver.quit();
  });


  test.it('should allow input of a title and a task', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});

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
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title')
    task.sendKeys('Test Task')
    button.click();

    const renderTitle = driver.findElement({ className: 'title-render'});
    const body = driver.findElement({ className: 'editable-body'});

    renderTitle.getText().then((copy)=> {
      assert.equal(copy, 'Test title');
    });
    body.getText().then((copy)=> {
      assert.equal(copy, 'Test Task');
    });
  });

  test.it('should clear input fields after save is clicked', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title')
    task.sendKeys('Test Task')
    button.click();

    title.getText().then((copy)=> {
      assert.equal(copy, '');
    });
    task.getText().then((copy)=> {
      assert.equal(copy, '');
    });
  });

  test.it('should persist saved tasks when refreshed', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title');
    task.sendKeys('Test Task');
    button.click();
    driver.navigate().refresh();

    const renderTitle = driver.findElement({ className: 'title-render'});
    const body = driver.findElement({ className: 'editable-body'});

    renderTitle.getText().then((copy)=> {
      assert.equal(copy, 'Test title');
    });
    body.getText().then((copy)=> {
      assert.equal(copy, 'Test Task');
    });
  });

  test.it('task should have a default importance of normal', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title');
    task.sendKeys('Test Task');
    button.click();

    const qualityText = driver.findElement({ className: 'quality-text'});
    qualityText.getText().then((copy)=> {
      assert.equal(copy, 'importance: normal');
    });
  });

  test.it('task importance should be upvoteable and persist in local storage', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title');
    task.sendKeys('Test task');
    button.click();

    const upVote = driver.findElement({ className: 'upvote'});
    upVote.click();
    driver.navigate().refresh();

    const qualityText = driver.findElement({ className: 'quality-text'});
    qualityText.getText().then((copy)=> {
      assert.equal(copy, 'importance: high');
    });
  });

  test.it('task importance should be downvoteable', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title');
    task.sendKeys('Test task');
    button.click();

    const downVote = driver.findElement({ className: 'downvote'});
    downVote.click();
    driver.navigate().refresh();

    const qualityText = driver.findElement({ className: 'quality-text'});
    qualityText.getText().then((copy)=> {
      assert.equal(copy, 'importance: low');
    });
  });

  test.it('when delete is clicked, the corresponding task should be removed from DOM', ()=> {
    const title = driver.findElement({ className: 'todo-title'});
    const task = driver.findElement({ className: 'todo-task'});
    const button = driver.findElement({ className: 'save-button'});

    title.sendKeys('Test title');
    task.sendKeys('Test task');
    button.click();
    title.sendKeys('Test title2');
    task.sendKeys('Test task2');
    button.click();


    const deleteBtn = driver.findElement({ className: 'delete'});
    deleteBtn.click();
    const titleRender = driver.findElement({ className: 'title-render'});
    titleRender.getText().then((copy)=> {
      assert.equal(copy, 'Test title');
    });
  });

  test.it('when task is deleted, it should not persist on browser refresh', ()=> {
      const title = driver.findElement({ className: 'todo-title'});
      const task = driver.findElement({ className: 'todo-task'});
      const button = driver.findElement({ className: 'save-button'});

      title.sendKeys('Test title');
      task.sendKeys('Test task');
      button.click();
      title.sendKeys('Test title2');
      task.sendKeys('Test task2');
      button.click();

      const deleteBtn = driver.findElement({ className: 'delete'});
      deleteBtn.click();
      driver.navigate().refresh();
      driver.findElements({ className: 'todo-render'}).then((cards)=> {
        assert.equal(cards.length, 1);
      });
    });

    test.it('existing task body and title should be editable, and changes should persist on focus-out and refresh', ()=> {
      const title = driver.findElement({ className: 'todo-title'});
      const task = driver.findElement({ className: 'todo-task'});
      const button = driver.findElement({ className: 'save-button'});

      title.sendKeys('Test title');
      task.sendKeys('Test task');
      button.click();

      const titleRender = driver.findElement({ className: 'title-render'});
      titleRender.sendKeys('Edit this: ');
      task.click();
      driver.navigate().refresh().then(()=>{
        const newTitle = driver.findElement({ className: 'title-render' });
        return newTitle.getText()
      }).then((text)=> {
        assert.equal(text, 'Edit this: Test title');
      });
  });

    test.it('when browser is refreshed, completed tasks should not be displayed', ()=> {
      const title = driver.findElement({ className: 'todo-title' });
      const task = driver.findElement({ className: 'todo-task' });
      const button = driver.findElement({ className: 'save-button' });

      title.sendKeys('Test title');
      task.sendKeys('Test task');
      button.click();

      const completedBtn = driver.findElement({ className: 'done' });
      completedBtn.click();
      driver.navigate().refresh();
      driver.findElements({ className: 'todo-render' }).then((cards)=> {
        assert.equal(cards, 0);
      });
    });

    test.it('should have a "show completed todos" button that displays hidden, completed tasks at the top of the list', ()=> {
      const title = driver.findElement({ className: 'todo-title' });
      const task = driver.findElement({ className: 'todo-task' });
      const button = driver.findElement({ className: 'save-button' });

      title.sendKeys('Test title');
      task.sendKeys('Test task');
      button.click();

      const completedBtn = driver.findElement({ className: 'done' });
      completedBtn.click();
      driver.navigate().refresh();
      driver.findElements({ className: 'todo-render' }).then((cards)=> {
        assert.equal(cards.length, 0);
      });

      const showToDo = driver.findElement({ className: 'completed-todos' });
      showToDo.click();
      driver.findElements({ className: 'todo-render' }).then((cards)=> {
        assert.equal(cards.length, 1);
      });
    });

    test.it('when completed task is clicked, state of task should change', ()=> {
      const title = driver.findElement({ className: 'todo-title' });
      const task = driver.findElement({ className: 'todo-task' });
      const button = driver.findElement({ className: 'save-button' });

      title.sendKeys('Test title');
      task.sendKeys('Test task');
      button.click();

      const completed = driver.findElement({ className: 'done' });
      completed.click();
      driver.findElements({ className: 'task-completed'}).then((cards)=> {
        assert.equal(cards.length, 1);
      });
    });

    test.it('should have a live search feature', ()=> {
      const title = driver.findElement({ className: 'todo-title' });
      const task = driver.findElement({ className: 'todo-task' });
      const button = driver.findElement({ className: 'save-button' });
      const searchInput = driver.findElement({ className: 'search-input'});

      title.sendKeys('Hat');
      task.sendKeys('Hat Hat');
      button.click();
      title.sendKeys('Car');
      task.sendKeys('Car Car');
      button.click();
      searchInput.sendKeys('car');
    })

  });
