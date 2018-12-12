$(document).ready(function() {

//variables
var topics = ["Keanu Reeves","George Clooney","Brad Pitt","Meryl Streep","Sophia Loren","Anne Hathaway","Jack Nicholson","Humphrey Bogart","Johnny Depp","Julia Roberts","Emma Stone","Octavia Spencer"];

//functions

function makeButtons() {
    $("#topicButtons").empty();
    for (var i=0; i<topics.length; i++) {
        var a = $("<button>");
        // a.addClass("actors");
        a.addClass("btn btn-danger btn-sm actors");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topicButtons").append(a);
    }
}

$("#submit").on("click", function(event) {
    event.preventDefault();
    var actorName = $("#addTopic").val().trim();
    topics.push(actorName);
    makeButtons();
});

makeButtons();

$("button").on("click", function() {
    var person = $(this).attr("data-name");
    var updatePerson = person.split(' ').join('+');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+updatePerson+"&api_key=ojHUH4Kcc4NcAk1Py8pPCZ9FYKBf8Gfe&limit=10";
    console.log(this);
    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(response) {
        var results = response.data;
        for (var i=0; i<results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(p);
                gifDiv.append(personImage)
                $("#gifs").prepend(gifDiv);
            }
        }
    });
    console.log(queryURL);
});

});