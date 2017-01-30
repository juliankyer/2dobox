
$(".search-input").on("keyup", function(){
  let userSearch = $(this).val().toLowerCase();
  $('.todo-render').each(function() {
    let taskTitle = $(this).find('.title-render').text().toLowerCase();
    let taskBody = $(this).find('.editable-body').text().toLowerCase();
    if (taskTitle.indexOf(userSearch) !== -1 || taskBody.indexOf(userSearch) !== -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
});
