function ideaTemplate(title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.importance = importance || 'normal';
}

module.exports = ideaTemplate;