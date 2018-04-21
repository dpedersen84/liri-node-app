let env = require("dotenv").config();
let keys = require("./keys.js");
let request = require("request");

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

};

function spotifySong() {

};

function movieThis() {

};

function doWhatItSays() {

};
