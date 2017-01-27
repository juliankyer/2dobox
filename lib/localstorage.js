const ideaTemplate = require('./constructor');

const Storage = {
storeIdeas: function(ideaTemplate) {
  localStorage.setItem(ideaTemplate.id, JSON.stringify(ideaTemplate));
},

// getIdeas: function(ideaTemplate) {
//   localStorage.getItem(ideaTemplate.id, JSON.parse(ideaTemplate));
// }

}

module.exports = Storage;
