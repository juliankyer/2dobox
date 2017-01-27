const buttons = require('./buttons');
const storeIdeas = require('./localstorage');
const path = require('path');
const ideaTemplate = require('./constructor');
const renderIdea = require('./createtodo');
require('./script.js');

buttons.saveButton();

$(document).ready(()=> {
  for (var key in localStorage) {
    let parsedTask = JSON.parse(localStorage[key]);
    renderIdea(parsedTask);
  }
});


// storage.storeIdeas();









// require('./styles.scss');
