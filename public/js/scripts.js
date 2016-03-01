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
    $('input#answer').val($(this).attr('id'));
  });

  if ($('#pie').length) {
  	var data = [];
  	var newObj = {};
  	$('.answer-data').each(function() {
  		newObj = {};
  		newObj['name'] = $.trim($('.answer', this).text());
  		newObj['y'] = Number($('.votes', this).text());
  		data.push(newObj);
  	});
  	var question = $.trim($('.question').text());
  	buildPie(data, question);
  }
});

function buildPie(data, question) {
	console.log(data);
	$(function () {
	    $('#pie').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: question
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Responses',
	            colorByPoint: true,
	            data: data
	        }]
	    });
	});
}