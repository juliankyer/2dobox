const buttons = require('./buttons');
const Storage = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
const renderToDo = require('./createtodo');
require('./search.js');


buttons.saveButton();
buttons.showCompleted();

$(document).ready(()=> {
  for (const key in localStorage) {
    let displayToDos = Storage.getToDo(key);
    if (displayToDos.completed !== true)
    renderToDo(displayToDos);
  };
  updateCharCount();
});

$('.todo-task').on('keyup', ()=> {
  updateCharCount();
});

let updateCharCount = (()=>{
  let charRemaining = 120 - $('.todo-task').val().length;
  $('.char-count').text('Characters Remaining: ' + charRemaining);
});

$('.input-text').on('keyup', function(){
  if ($('.todo-title').val() === '' || $('.todo-task').val() === '') {
    buttons.disableSubmit();
  } else {
    buttons.enableSubmit();
  }
})
