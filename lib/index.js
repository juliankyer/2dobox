const buttons = require('./buttons');
const Storage = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
const renderIdea = require('./createtodo');
require('./script.js');

buttons.saveButton();

$(document).ready(()=> {
  for (const key in localStorage) {
    let displayToDos = Storage.getToDo(key);
    renderIdea(displayToDos);
  }
});
