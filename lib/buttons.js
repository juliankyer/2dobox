const ideaTemplate = require('./constructor');
const storeIdeas = require('./localstorage');
const renderIdea = require('./createtodo');

const buttons = {
saveButton: function() { $('.save-button').on('click', function(e) {
  e.preventDefault();
  var $titleInput = $('.todo-title').val();
  var $ideaInput = $('.todo-task').val();
  var newIdea = new ideaTemplate($titleInput, $ideaInput);
  renderIdea(newIdea);
  storeIdeas(newIdea);
  clearInputs();
});
},
}

$('.list-section').on('click', '.delete', function() {
  var id = $(this).closest('.todo-render').prop('id');
  $(this).closest('.todo-render').remove();
  localStorage.removeItem(id);
});

$('.list-section').on('click', '.done', function() {
$(this).closest('.todo-render').toggleClass('task-completed')
});

function clearInputs() {
  $('.todo-title').val('');
  $('.todo-task').val('');
}

module.exports = buttons;
