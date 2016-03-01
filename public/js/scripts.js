var currentAnswerNumber = 3;
$(document).ready(function() {
  $('#add-answer').click(function(event) {
    event.preventDefault();
    $(this).before('<div class="form-group">' +
                      '<label for="answer'+ currentAnswerNumber +'">Answer '+ currentAnswerNumber +':</label>' +
                      '<input name="answer'+ currentAnswerNumber +'" type="text" class="form-control" id="answer'+ currentAnswerNumber +'" placeholder="">' +
                    '</div>');
    currentAnswerNumber++;
  });

  $('#poll a').click(function(event) {
    event.preventDefault();
    $('.active').removeClass('active');
    $(this).addClass('active');
  });
});