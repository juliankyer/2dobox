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
$(this).closest('.todo-render').addClass('task-completed');
let id = Storage.getID(this);
let currentToDo = Storage.getToDo(id);
Storage.storeToDo(currentToDo);
});

let clearInputs = (()=> {
  $('.todo-title').val('');
  $('.todo-task').val('');
});

$('.list-section').on('focusout', '.title-render', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let selectTitle = $(this).closest('.todo-render').find('.title-render');
  let newTitle = selectTitle.text();
  currentToDo.title = newTitle;
  Storage.storeToDo(currentToDo);
});

$('.list-section').on('focusout', '.editable-body', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let selectBody = $(this).closest('.todo-render').find('.editable-body');
  let newBody = selectBody.text();
  currentToDo.body = newBody;
  Storage.storeToDo(currentToDo);
});

$('.list-section').on('click', '.upvote', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let currentImportance = currentToDo.importance;
  let newImportance = upVote(currentImportance);
  currentToDo.importance = newImportance;
  Storage.storeToDo(currentToDo);

  let domText = $(this).closest('.todo-render').find('.quality-text').text();
  let newDomImportance = upvoteDomQuality(domText);
  // console.log(newDomImportance);
  $(this).closest('.todo-render').find('.quality-text').html(newDomImportance);
});

$('.list-section').on('click', '.downvote', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let currentImportance = currentToDo.importance;
  let newImportance = downVote(currentImportance);
  currentToDo.importance = newImportance;
  Storage.storeToDo(currentToDo);

  let domText = $(this).closest('.todo-render').find('.quality-text').text();
  let newDomImportance = downvoteDomQuality(domText);
  // console.log(newDomImportance);
  $(this).closest('.todo-render').find('.quality-text').html(newDomImportance);
});

let upVote = ((importance)=> {
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
});

let downVote = ((importance)=> {
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
});

let upvoteDomQuality = ((importance)=> {
  switch (importance) {
    case 'importance: none':
      return 'importance: low';
      break;
    case 'importance: low':
      return 'importance: normal';
      break;
    case 'importance: normal':
      return 'importance: high';
      break;
    case 'importance: high':
      return 'importance: critical';
    default:
      return 'importance: critical';
      break;
  }
});

let downvoteDomQuality = ((importance)=> {
  switch(importance) {
    case 'importance: critical':
      return 'importance: high';
      break;
    case 'importance: high':
      return 'importance: normal';
      break;
    case 'importance: normal':
      return 'importance: low';
      break;
    case 'importance: low':
      return 'importance: none';
      break;
    default:
      return 'importance: none';
      break;
  }
});

module.exports = buttons;
