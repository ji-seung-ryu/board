$(function() {
  $("button").on("click", function () {
    $.ajax({
      type: 'POST',
      url: '/',
      success: function(order) {
        $('#get_output').html('<h1> good </h1>');
      }
    });
  });
});