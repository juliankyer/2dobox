const buttons = require('./buttons');
const Storage = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
<<<<<<< HEAD
const renderIdea = require('./createtodo');
require('./search.js');
=======
const renderToDo = require('./createtodo');
require('./script.js');
>>>>>>> 94f3eebf5bc73a2611f7b4fb1cd16f2c5f6b3744

buttons.saveButton();
buttons.showCompleted();

$(document).ready(()=> {
  for (const key in localStorage) {
    let displayToDos = Storage.getToDo(key);
    if (displayToDos.completed !== true)
    renderToDo(displayToDos);
  }
});
