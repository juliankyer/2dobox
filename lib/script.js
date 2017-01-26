var ideas = JSON.parse(localStorage.getItem('savedArray')) || [];

$(document).ready(function() {
  renderFromStorage();
})

function ideaTemplate(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'swill';
}

$('.save-button').on('click', function(e) {
  e.preventDefault();
  $('.todo-render').remove();
  var $titleInput = $('.todo-title').val();
  var $ideaInput = $('.todo-task').val();
  var newIdea = new ideaTemplate($titleInput, $ideaInput);
  ideas.push(newIdea);
  storeIdeas();
  renderFromStorage();
  clearInputs();
});

function storeIdeas() {
  localStorage.setItem('savedArray', JSON.stringify(ideas));
};

function renderFromStorage() {
  for (var i = 0; i < ideas.length; i++) {
    renderIdea(ideas[i]);
  }
};

function renderIdea(newIdea) {
  $('.list-section').prepend(`
     <div id=${newIdea.id} class ="todo-render">
     <div class="id-wrapper">
       <h2 class ="title-render" contenteditable="true">${newIdea.title}</h2>
       <button class="button delete">delete</button>
     </div>
     <p class="editable-body" contenteditable="true">${newIdea.body}</p>
     <div id="button-wrapper">
       <button class = "button upvote"></button>
       <button class = "button downvote"></button>
       <span class="quality-text">quality: ${newIdea.quality}</span>
     </div>
   </div>`)
}

function clearInputs() {
  $('.todo-title').val('');
  $('.todo-task').val('');
}

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

function upVote(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible';
      break;
    case 'plausible':
      return 'genius';
      break;
    default:
      return 'genius';
      break;
  }
}

function downVote(quality) {
  switch(quality) {
    case 'genius':
      return 'plausible';
      break;
    case 'plausible':
      return 'swill';
      break;
    default:
      return 'swill';
      break;
  }
}

$('.list-section').on('click', '.upvote', function() {
  var $targetID = $(this).closest('.todo-render').attr('id');
  for (var i = 0; i < ideas.length; i++) {
    if (Number($targetID) === ideas[i].id) {
      $('.todo-render').remove();
      var newQuality = upVote(ideas[i].quality);
      ideas[i].quality = newQuality;
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
      var newQuality = downVote(ideas[i].quality);
      ideas[i].quality = newQuality;
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
