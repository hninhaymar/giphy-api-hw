var topics = ['mickey mouse','disney elsa','disney anna','goofy','donald duck'];

function displayDisneyInfo(){
    var disney = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search";

    queryURL += '?' + $.param({
        'api_key': "XhGQU9FapHV7Vb5xGQChOgTdGwRXvyXL",
        'q': disney,
        'limit' : 10
    });

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).done(function(result) {
        $("#gifs-view").empty();
        var gifs = result.data;
        gifs.forEach(function(g){
            var container = $("<div class='float-left'>");
            var rating = $('<p>').append("Rating: " + g.rating);
            var img = $("<img>");
            var img_still = g.images.fixed_height_still.url;
            var img_animate = g.images.fixed_height.url;
            img.attr("data-state","still");
            img.attr("src",img_still);
            img.attr("data-still",img_still);
            img.attr("data-animate",img_animate);
            img.attr("alt",g.title);
            img.addClass("gif");

            container.append(rating).append(img);

            $("#gifs-view").append(container);
        });
    }).fail(function(err) {
        throw err;
    });
}

function renderButtons() {

    $("#buttons-view").empty();
    // Loops through the array of topics
    var localStorageTopics = localStorage.getItem("topics");
    if(localStorageTopics != null){
        topics = localStorageTopics.split(",");
    }
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      var a = $("<button class='btn btn-outline-info btn-sm bg-info text-white'>");

      a.addClass("disney");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
}

$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var topic = $("#topic-input").val().trim();
    if(topic !== ""){
        topics.push(topic);
        localStorage.clear();
        localStorage.setItem("topics",topics);
        renderButtons();
        $("#topic-input").val("");
    }
  });

  // Adding click event listeners to all elements with a class of "disney"
$(document).on("click", ".disney", displayDisneyInfo);

$(document).on("click", ".gif", function(e){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    }
    else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
    }
});


renderButtons();