$(document).ready(function(){
	$('#selected-plays > li').addClass("horizontal");
	//console.log($('#selected-plays li:not(.horizontal)').addClass('sub-level'));
	$('li:not(.horizontal)').addClass('sub-level');;
});
