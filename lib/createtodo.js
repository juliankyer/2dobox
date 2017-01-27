module.exports = function renderIdea(newIdea){
  $('.list-section').prepend(`
    <div id=${newIdea.id} class ="todo-render">
      <div class="id-wrapper">
        <h2 class ="title-render" contenteditable="true">${newIdea.title}</h2>
        <button class="button delete">delete</button>
      </div>
      <p class="editable-body" contenteditable="true">${newIdea.body}</p>
      <div id="button-wrapper">
        <div id="vote-buttons">
        <button class="button upvote"></button>
        <button class="button downvote"></button>
        <label class="quality-text">importance: ${newIdea.importance}</label>
      </div>
        <button class="button done"></button>
      </div>
    </div>`)
}
