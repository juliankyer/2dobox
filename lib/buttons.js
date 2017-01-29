const ideaTemplate = require('./constructor');
const Storage = require('./localstorage');
const renderIdea = require('./createtodo');

const buttons = {
saveButton: ()=> {$('.save-button').on('click', (e)=> {
  e.preventDefault();
  let $titleInput = $('.todo-title').val();
  let $taskInput = $('.todo-task').val();
  let newToDo = new ideaTemplate($titleInput, $taskInput);
  renderIdea(newToDo);
  Storage.storeToDo(newToDo);
  clearInputs();
});
},
}

$('.list-section').on('click', '.delete', function() {
  let id = Storage.getID(this);
  $(this).closest('.todo-render').remove();
  localStorage.removeItem(id);
});

$('.list-section').on('click', '.done', function() {
$(this).closest('.todo-render').toggleClass('task-completed');
});

function clearInputs() {
  $('.todo-title').val('');
  $('.todo-task').val('');
}

$('.list-section').on('focusout', '.title-render', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let selectTitle = $(this).closest('.todo-render').find('.title-render');
  let newTitle = selectTitle.text();
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
