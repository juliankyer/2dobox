const buttons = require('./buttons');
const ideaTemplate = require('./constructor');


// $(document).ready(function() {
//   renderFromStorage();
// })

// function renderFromStorage() {
//   for (var i = 0; i < ideas.length; i++) {
//     renderIdea(ideas[i]);
//   }
// };





$('.list-section').on('click', '.done', function() {
  $(this).closest('.todo-render').toggleClass('task-completed');
});

$('.list-section').on('click', '.delete', function() {
  $(this).closest('.todo-render').remove();
  var tagID = $(this).closest('.todo-render').prop('id');
  for (var i = 0; i < ideas.length; i++) {
    if (tagID == ideas[i].id) {
      ideas.splice(i, 1);
    }
  storeIdeas();
  }
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

$('.list-section').on('click', '.upvote', function() {
  var $targetID = $(this).closest('.todo-render').attr('id');
  for (var i = 0; i < ideas.length; i++) {
    if (Number($targetID) === ideas[i].id) {
      $('.todo-render').remove();
      var newImportance = upVote(ideas[i].importance);
      ideas[i].importance = newImportance;
      storeIdeas();
      renderFromStorage();
    }
  }
});

$('.list-section').on('click', '.downvote', function() {
  var $targetID = $(this).closest('.todo-render').attr('id');
  for (var i = 0; i < ideas.length; i++) {
    if (Number($targetID) === ideas[i].id) {
      $('.todo-render').remove();
      var newImportance = downVote(ideas[i].importance);
      ideas[i].importance = newImportance;
      storeIdeas();
      renderFromStorage();
    }
  }
});

$('.list-section').on('focusout', '.title-render', function() {
  var $targetID =  $(this).closest('.todo-render').attr('id');
  for (var i = 0; i < ideas.length; i++) {
    if (Number($targetID) === ideas[i].id) {
      $('.todo-render').remove();
      var newTitle = $(this).closest('.title-render').html();
      ideas[i].title = newTitle;
      storeIdeas();
      renderFromStorage();
    }
  }
});

$('.list-section').on('focusout', '.editable-body', function() {
  var $targetID =  $(this).closest('.todo-render').attr('id');
  for (var i = 0; i < ideas.length; i++) {
    if (Number($targetID) === ideas[i].id) {
      $('.todo-render').remove();
      var newBody = $(this).closest('.editable-body').html();
      ideas[i].body = newBody;
      storeIdeas();
      renderFromStorage();
    }
  }
});

$('.search-input').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase();
  $('.todo-render').each(function (ind, el) {
    var text = $(el).text().toLowerCase();
    var match = !!text.match(searchInput);
    $(el).toggle(match);
  })
})
