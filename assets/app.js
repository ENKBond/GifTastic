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

$(".trigger_popup").click(function(){
    $('.hover_bkgr').show();
 });
 $('.hover_bkgr').click(function(){
     $('.hover_bkgr').hide();
 });
 $('.popupCloseButton').click(function(){
     $('.hover_bkgr').hide();
 });

$("#submit").on("click", function(event) {
    event.preventDefault();
    var actorName = $("#addTopic").val().trim();
    topics.push(actorName);
    makeButtons();
});

makeButtons();

$("button").on("click", function() {
    $("#gifs").empty();
    var person = $(this).attr("data-name");
    // var updatePerson = person.split(' ').join('+');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+person+"&api_key=ZGRrIOC3BqkaERK8RULPbE0CNs1qFcmk&limit=10";
    console.log(this);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i=0; i<results.length; i++) {
            console.log(results[i]);
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                console.log(results[i]);
                var p = $("<p>").text("Rating: " + results[i].rating);
                
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_width_still.url);
                gifDiv.append(p);
                gifDiv.append(personImage)
                $("#gifs").prepend(gifDiv);
            }
        }
    });
    console.log(queryURL);
});


});