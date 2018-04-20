let env = require("dotenv").config();
let keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log("hello");