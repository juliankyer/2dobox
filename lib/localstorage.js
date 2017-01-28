const ideaTemplate = require('./constructor');

const Storage = {
storeToDo: function(ideaTemplate) {
  localStorage.setItem(ideaTemplate.id, JSON.stringify(ideaTemplate));
},

getID: function(selector){
  return $(selector).closest('.todo-render').attr('id');
},

getToDo: function(id){
  return JSON.parse(localStorage.getItem(id))
}

};





module.exports = Storage;
