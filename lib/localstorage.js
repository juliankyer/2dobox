const ideaTemplate = require('./constructor');

module.exports = function storeIdeas(ideaTemplate) {
  localStorage.setItem(ideaTemplate.id, JSON.stringify(ideaTemplate));
}

//
// ideas: ()=> {
//   let ideaID = ideaTemplate.id;
//   JSON.parse(localStorage.getItem(ideaID))
// }
// }
