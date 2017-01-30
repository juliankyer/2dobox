module.exports = function renderIdea(newIdea){
  $('.list-section').prepend(`
    <div id=${newIdea.id} class ="todo-render">
      <div class="id-wrapper">
        <h2 class ="title-render" contented itable="true">${newIdea.title}</h2>
        <button class="button delete">delete</button>
      </div>
      <p class="editable-body" contenteditable="true">${newIdea.body}</p>
      <div class="button-wrapper">
        <div class="vote-buttons">
          <button class="button upvote" aria-label="vote up"></button>
          <button class="button downvote" aria-label="vote down"></button>
          <label class="quality-text">importance: <span class="quality">${newIdea.importance}</span></label>
        </div>
        <button class="button done" aria-label="task completed"></button>
      </div>
    </div>`)
}
