require("dotenv").config();

var request = require("request");
var keys = require("./keys.js")
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: '4f1b78d04c1d405390a43b7a9c50575f',
    secret: '0db9c6f1bf8c47ed80c5f1bd6c90c394'
});

var source = process.argv[2];
var inputString = process.argv[3];
// var spotifyURL = "http://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6" + inputString + "";


console.log("----------------------------------------")

function concertThis(band){
    var concertURL = "https://rest.bandsintown.com/artists/" + inputString + "/events?app_id=codingbootcamp"
    request(concertURL, function(error, response, body){
    if(!error && response.statusCode === 200){
        var bandArray = JSON.parse(body)
        bandArray.forEach(function(event){
            console.log("Venue name: ", event.venue.name)
            console.log("Venue city: ", event.venue.city)
            console.log("Concert date: ", event.datetime)
            console.log("----------------------------------------")
        })
        
    }
});

function movieThis(movie){
    var movieUrl = "http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=trilogy";
    request(movieUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            // movie.forEach(function(event){
            console.log("Movie Title: " + movie.Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1]);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("----------------------------------------")
            }
        })
    }
}

function spotifyThis(song){
spotify.search({type:"track", query: song}, function(error, data){
    if (error) {
        return console.log("Something went wrong: " + error);
    }

    var response = data.tracks.items;
        response.forEach(song => {
            console.log("Song Name: " + song.name),
            console.log("Artist Name: " + song.artists[0].name),
            console.log("Album Name: " + song.album.name),
            console.log("Link: " + song.href)
            console.log("----------------------------------------")
        })
    });
}

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(error, data){
        data = data.split(",");
        console.log(data)
    })
}

if (source === "concert-this"){
    concertThis(inputString);
    
} else if (source === "movie-this"){
    movieThis(inputString);
    
} else if (source === "spotify-this-song"){
    spotifyThis(inputString);
    
} else if (source === "do-what-it-says"){
    doWhatItSays();
}