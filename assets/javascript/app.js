$(document).ready (function() {

// declaring variables
	var apiKey = "c95c3ef03aa746f3b6ab73ddf5b85bd6";
	var gifUrl;
	var gifRating;
	var index = 0;
	var newGifDiv;
	var rating;
	var resultQty = 10;
	var topic;

	// array of names of top athlete of 21st century, which will display
	var topics = ["Derek Jeter", "Floyd Mayweather", "Diana Taurasi ", "Tim Duncan", "Albert Pujols", "Sidney Crosby", "Rafael Nadal", "Simone Biles", "Peyton Manning", "Tiger Woods", 
		"Michael Phelps", "Kobe Bryant", "Serena Williams", "Roger Federer", "Tom Brady", "LeBron James", "Cristiano Ronaldo", "Lionel Messi", "Usain Bolt"];
	var video;

	// Add a new button with the topic input by the user
    $("#add-event").on("click", function() {
        event.preventDefault();
        topic = $("#event-input").val().trim();
        $("#event-input").val("");
        topics.push(topic);
        renderButtons();
    });

    // Click handler for gif finder buttons
	$(document).on("click", ".gif-finder-btn", function() {
		$("#gif-div").empty();
		topic = $(this).attr("data-topic");
		displayTopicInfo();
	});

	// Retrieve gifs from giphy 
	function displayTopicInfo() {
		$("#gif-div-all").empty();
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?q=" + topic +  "&api_key=" + apiKey + "&limit=" + resultQty,
			method: "GET"
		}).done( function(response) {
			console.log(response);

	// Create and display new divs with gif with rating
	for (var i = 0; i < resultQty; i++) {
		rating = "<h3>Rating: " + response.data[i].rating + "</h3>";
		gifUrl = response.data[i].images.original_mp4.mp4;
		video = "<video class='gif' loop><source src=" + gifUrl + " type='video/mp4'></video>";
		newGifDiv = ("<div class='gif-div-individual' id='gif-div" + i + "'>" + rating + video + "</div>");
		$("#gif-div").append(newGifDiv);
	}

	// Clicking on each gif for play and pause
	$(".gif").on("click", function () {
		if (this.paused) {
		this.play();
		} 
		
		else {
			this.pause();
		}
	});
});

 }

	// Render buttons for all topics 
	function renderButtons() {
		while (index < topics.length) {
			$("#btn-div").append("<button class='gif-finder-btn' data-topic='" + topics[index] + "'>" + topics[index] + "</button>");
			index++;
		}
	}

    renderButtons();
});

 