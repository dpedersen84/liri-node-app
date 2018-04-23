let env = require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let request = require("request");
let Spotify = require("node-spotify-api");
let Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let command = process.argv[2];

// Splits the process.argv array after index 2 and makes searchTerm everything after
let searchTerm = process.argv.slice(3).join(" ");

// Switch statement for command
switch (command) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifySong(searchTerm);
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    default:
    console.log("Sorry, LIRI doesn't understand that. Please try again.");
    //catchAll();
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

function spotifySong(searchTerm) {
    
    spotify.search({type: "track", query: searchTerm}, function(error, data) {
        if(error) {
            return console.log("Error, please try again.");
        }
        // console.log(data.tracks.items);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
        console.log("Song Name: " + data.tracks.items[0].name)
        console.log("Album: " + data.tracks.items[0].album.name)
        console.log("Preview Link: " + data.tracks.items[0].preview_url)
    })
};

function movieThis() {
    
    let queryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    request(queryURL, function(error, response, body) {
        if(error) {
            return console.log("Error, please try again.");
        }

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

        let dataArray = data.split(",");

        let dataOne = dataArray[0];

        let dataTwo = dataArray[1];

        spotifySong(dataTwo);
    })
};

function catchAll() {
    //inquirer.prompt(...).then(function(response){
        //if(rsponse === "movie-this"){movieThis()}
    // })
};