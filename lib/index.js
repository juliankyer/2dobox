const buttons = require('./buttons');
const Storage = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
const renderIdea = require('./createtodo');
require('./script.js');

buttons.saveButton();
buttons.showCompleted();

$(document).ready(()=> {
  for (const key in localStorage) {
    let displayToDos = Storage.getToDo(key);
    if (displayToDos.completed !== true)
    renderIdea(displayToDos);
  }
});
