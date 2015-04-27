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
		$(".displayGames").append("<div class='col-md-4 className' data-id='" + results[j].id + "'><img src='" + results[j].image.small_url +"'/>"+ "<br>" + results[j].name +"</div>");
	}
}


// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
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
		var name = $(this).data("id");
		for (i = 0; i < array.length; i++) {
			if (array[i].id == name){
				if (array[i].deck != null) {
					var description = array[i].deck;
				} else {
					var description = "No Info Available";
				}
				$(this).animate({height: 'auto'});
				$(this).animate({width: 'auto'});
				$(this).css({backgroundColor: '#00ff00'})
				$(this).css({color: '#000000'})
				$(this).hide().slideDown().append("<div><b>Description:</b> " + description + "<br><b>Platform: </b>" + array[i].platforms[0].name + "<br><b>Release Date: </b>" + array[i].original_release_date + "</p></div>");
			}
		}
	});
});












