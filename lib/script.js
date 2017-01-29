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







// LOOK INTO FILTER, FIND


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




$('.search-input').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase();
  $('.todo-render').each(function (ind, el) {
    var text = $(el).text().toLowerCase();
    var match = !!text.match(searchInput);
    $(el).toggle(match);
  });
});
