class ideaTemplate {
  constructor(title, body, id, importance) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.importance = importance || 'normal';
    this.completed = false;
  }
};

// class IdeaTemplate () {
//   constructor(title, body, id ) {}
// }

module.exports = ideaTemplate;
