const ideaTemplate = require('./constructor');

const Storage = {
storeToDo(ideaTemplate) {
  localStorage.setItem(ideaTemplate.id, JSON.stringify(ideaTemplate));
},

getID(selector){
  return $(selector).closest('.todo-render').attr('id');
},

getToDo(id){
  return JSON.parse(localStorage.getItem(id))
}

};





module.exports = Storage;
