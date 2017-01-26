const ideaTemplate = require('./constructor');

module.exports = function storeIdeas(ideaTemplate) {
  let ideaID = ideaTemplate.id;
  let stringIdea = JSON.stringify(ideaTemplate);
  localStorage.setItem(ideaID, stringIdea);
}

//
// ideas: ()=> {
//   let ideaID = ideaTemplate.id;
//   JSON.parse(localStorage.getItem(ideaID))
// }
// }
