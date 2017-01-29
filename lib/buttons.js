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
$(this).closest('.todo-render').toggleClass('task-completed')
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

$('.list-section').on('click', '.upvote', function() {
  var id = Storage.getID(this);
  var currentToDo = Storage.getToDo(id);
  var currentImportance = currentToDo.importance;
  var newImportance = upVote(currentImportance);
  currentToDo.importance = newImportance;
  Storage.storeToDo(currentToDo);
  console.log(currentToDo);
});

$('.list-section').on('click', '.downvote', function() {
  var id = Storage.getID(this);
  var currentToDo = Storage.getToDo(id);
  var currentImportance = currentToDo.importance;
  var newImportance = downVote(currentImportance);
  currentToDo.importance = newImportance;
  Storage.storeToDo(currentToDo);
  console.log(currentToDo);
});

function upVote(importance) {
  switch (importance) {
    case 'none':
      return 'low';
      break;
    case 'low':
      return 'normal';
      break;
    case 'normal':
      return 'high';
      break;
    case 'high':
      return 'critical';
    default:
      return 'critical';
      break;
  }
}

function downVote(importance) {
  switch(importance) {
    case 'critical':
      return 'high';
      break;
    case 'high':
      return 'normal';
      break;
    case 'normal':
      return 'low';
      break;
    case 'low':
      return 'none';
      break;
    default:
      return 'none';
      break;
  }
}

module.exports = buttons;
