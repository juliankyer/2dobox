const ideaTemplate = require('./constructor');
const storeIdeas = require('./localstorage');
const renderIdea = require('./createtodo');

const buttons = {
saveButton: function() { $('.save-button').on('click', function(e) {
  e.preventDefault();
  $('.todo-render').remove();
  var $titleInput = $('.todo-title').val();
  var $ideaInput = $('.todo-task').val();
  var newIdea = new ideaTemplate($titleInput, $ideaInput);
  renderIdea(newIdea);
  storeIdeas(newIdea);
  clearInputs();
});
},



}

function clearInputs() {
  $('.todo-title').val('');
  $('.todo-task').val('');
}

module.exports = buttons;
