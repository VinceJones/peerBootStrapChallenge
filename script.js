var i;
var j;
var k;
var array = [];

var apikey = '10d0a85137d94904c75e456dcdf91468227c09ca'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
	array = results.slice(0);
	displayStuff(results);
}

function displayStuff(results) {
	for (j = 0; j < results.length; j++) {
		if (results[j].deck != null) {
					var description = results[j].deck;
				} else {
					var description = "No Info Available";
				}
		
		$(".displayGames").append("<div class='col-md-4 className group" + results[j].id + "'><img src='" + results[j].image.medium_url +"'/>"+ "<br>" + results[j].name +"</div>");
		$(".group"+results[j].id).append("<div class='hidden'><img src='" + results[j].image.medium_url +"'/>"+ "<br><b>Description:</b> " + description + "<br><b>Platform: </b>" + results[j].platforms[0].name + "<br><b>Release Date: </b>" + results[j].original_release_date + "</p></div>");
		
	}
}

function search(query){
	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});
}

$(document).ready(function() {

	$(".container").on("click", ".searchButton", function() {
		array = [];
		var searchVal = $(".searchField").val();
		console.log(searchVal);
		search(searchVal);
	});

	$(".displayGames").on("click", ".className",function(){
		console.log("Hi")
		$(this).children().toggleClass("hidden");

		$(this).animate({height: 'auto'});
		$(this).animate({width: 'auto'});
	});

});












