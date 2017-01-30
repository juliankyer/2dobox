const buttons = require('./buttons');
const Storage = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
const renderToDo = require('./createtodo');
require('./script.js');


buttons.saveButton();
buttons.showCompleted();

$(document).ready(()=> {
  for (const key in localStorage) {
    let displayToDos = Storage.getToDo(key);
    if (displayToDos.completed !== true)
    renderToDo(displayToDos);
  }
});

$('.input-text').on('keyup', function(){
  if ($('.todo-title').val() === '' || $('.todo-task').val() === '') {
    buttons.disableSubmit();
  } else {
    buttons.enableSubmit();
  }
})
