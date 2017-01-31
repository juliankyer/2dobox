const ideaTemplate = require('./constructor');
const Storage = require('./localstorage');
const renderToDo = require('./createtodo');

const buttons = {
  saveButton: ()=> {
    $('.save-button').on('click', (e)=> {
      e.preventDefault();
      let $titleInput = $('.todo-title').val();
      let $taskInput = $('.todo-task').val();
      let newToDo = new ideaTemplate($titleInput, $taskInput);
      renderToDo(newToDo);
      Storage.storeToDo(newToDo);
      clearInputs();
      resetCount();
      buttons.disableSubmit();
    });
  },

  showCompleted: ()=> {
    $('.completed-todos').on('click', (e)=> {
    e.preventDefault();
    for (const key in localStorage) {
      let displayCompleted = Storage.getToDo(key);
      if (displayCompleted.completed) {
        renderToDo(displayCompleted)
        $('#' + displayCompleted.id).toggleClass('task-completed');
      }
     }
   });
  },

  disableSubmit: ()=> {
    $('.save-button').attr('disabled', true)
  },

  enableSubmit: ()=> {
    $('.save-button').attr('disabled', false)
  }

}

$('.list-section').on('click', '.delete', function() {
  let id = Storage.getID(this);
  $(this).closest('.todo-render').remove();
  localStorage.removeItem(id);
});

$('.list-section').on('click', '.done', function() {
  $(this).closest('.todo-render').toggleClass('task-completed');
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  currentToDo.completed = true;
  Storage.storeToDo(currentToDo);
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

  let domText = $(this).closest('.todo-render').find('.quality').text();
  let newDomImportance = upVote(domText);
  $(this).closest('.todo-render').find('.quality').html(newDomImportance);
});

$('.list-section').on('click', '.downvote', function() {
  let id = Storage.getID(this);
  let currentToDo = Storage.getToDo(id);
  let currentImportance = currentToDo.importance;
  let newImportance = downVote(currentImportance);
  currentToDo.importance = newImportance;
  Storage.storeToDo(currentToDo);

  let domText = $(this).closest('.todo-render').find('.quality').text();
  let newDomImportance = downVote(domText);
  $(this).closest('.todo-render').find('.quality').html(newDomImportance);
});


let upVote = ((importance)=> {
  let importanceValues = {
    'none': 'low',
    'low': 'normal',
    'normal': 'high',
    'high': 'critical'
  };
  return importanceValues[importance];
});

let downVote = ((importance)=> {
  let importanceValues = {
    'critical': 'high',
    'high': 'normal',
    'normal': 'low',
    'low': 'none'
  };
  return importanceValues[importance];
});

let resetCount = (()=> {
  $('.char-count').text('Characters Remaining: 120');
})

let clearInputs = (()=> {
  $('.todo-title').val('');
  $('.todo-task').val('');
});

$('.none').on('click', function() {
  //find cards with importance of none
  $()
  //toggle so only those are shown
})

$('.low').on('click', function() {
  //find cards with importance of none
  $()
  //toggle so only those are shown
})

$('.normal').on('click', function() {
  //find cards with importance of none
  $()
  //toggle so only those are shown
})

$('.high').on('click', function() {
  //find cards with importance of none
  $()
  //toggle so only those are shown
})

$('.critical').on('click', function() {
  //find cards with importance of none
  $()
  //toggle so only those are shown
})

module.exports = buttons;
