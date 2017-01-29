const ideaTemplate = require('./constructor');
const Storage = require('./localstorage');
const renderIdea = require('./createtodo');

const buttons = {
saveButton: function() {$('.save-button').on('click', function(e) {
  e.preventDefault();
  var $titleInput = $('.todo-title').val();
  var $taskInput = $('.todo-task').val();
  var newToDo = new ideaTemplate($titleInput, $taskInput);
  renderIdea(newToDo);
  Storage.storeToDo(newToDo);
  clearInputs();
});
},
}

$('.list-section').on('click', '.delete', function() {
  var id = Storage.getID(this);
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

$('.list-section').on('focusout', '.title-render', function() {
  var id = Storage.getID(this);
  var currentToDo = Storage.getToDo(id);
  var selectTitle = $(this).closest('.todo-render').find('.title-render');
  var newTitle = selectTitle.text();
  currentToDo.title = newTitle;
  Storage.storeToDo(currentToDo);
});

$('.list-section').on('focusout', '.editable-body', function() {
  var id = Storage.getID(this);
  var currentToDo = Storage.getToDo(id);
  var selectBody = $(this).closest('.todo-render').find('.editable-body');
  var newBody = selectBody.text();
  currentToDo.body = newBody;
  Storage.storeToDo(currentToDo);
});


module.exports = buttons;
