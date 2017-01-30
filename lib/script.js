const buttons = require('./buttons');
const ideaTemplate = require('./constructor');


$(".search-input").on("keyup", function(){
  const ideaCards = $(".todo-render");
  const userSearchValue = $(this).val().toLowerCase();
  for (let i = 0; i < ideaCards.length; i++) {
    let ideaCardText = $(ideaCards[i]).text().toLowerCase();
    let matched = ideaCardText.indexOf(userSearchValue) !== -1;
    $(ideaCards[i]).toggle(matched);
  }
});
