let env = require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let request = require("request");
let Spotify = require("node-spotify-api");
let Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let command = process.argv[2];

// Switch statement for command

switch (command) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifySong();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}

//Functions

function myTweets() {

    var params = {screen_name: "@dpedersen84"};
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (error) {
            console.log("Error, please try again.");
        } else {
            for (let i = 0; i < 20; i++) {
                console.log("Created: " + tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("===========================================================")
            }
        }
         
    })
};

function spotifySong() {
    console.log("my spotify");
    let songName = process.argv[3];

    spotify.search({type: "track", query: songName}, function(error, data) {
        if(error) {
            return console.log("Error, please try again.");
        }
        console.log(data.tracks.items[1].album.name);
    })
};

function movieThis() {
    
    let movieName = process.argv[3];

    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    request(queryURL, function(error, response, body) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    })

};

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error, please try again.");

        }

        console.log(data);

        let dataArray = data.split(",");

        console.log(dataArray);

        let dataOne = dataArray[0];
        console.log(dataOne);

        let dataTwo = dataArray[1];
        console.log(dataTwo);
    })
};
