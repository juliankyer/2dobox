const buttons = require('./buttons');
const ideaTemplate = require('./constructor');

$('.search-input').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase();
  $('.todo-render').each(function (ind, el) {
    var text = $(el).text().toLowerCase();
    var match = !!text.match(searchInput);
    $(el).toggle(match);
  });
});
