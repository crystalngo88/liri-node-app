require("dotenv").config();

var request = require("request");
var moment = require("moment")
var keys = require("./keys.js")
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var source = process.argv[2];
var inputString = process.argv[3];

function appendInfo() {
    fs.appendFile("log.txt", source + ", " + inputString + '\r\n', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log("Content added to log.txt file");
            console.log("----------------------------------------")
        }
    })
};

console.log("----------------------------------------")

if (source === "concert-this") {
    concertThis(inputString);
    appendInfo();

} else if (source === "movie-this") {
    movieThis(inputString);
    appendInfo();

} else if (source === "spotify-this-song") {
    spotifyThis(inputString);
    appendInfo();

} else if (source === "do-what-it-says") {
    doWhatItSays(inputString);
    appendInfo();
}


function concertThis(band) {
    var concertURL = "https://rest.bandsintown.com/artists/" + inputString + "/events?app_id=codingbootcamp"
    request(concertURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bandArray = JSON.parse(body)
            bandArray.forEach(function (event) {
                console.log("Venue name: ", event.venue.name)
                console.log("Venue city: ", event.venue.city)
                console.log("Concert date: ", moment(event.datetime).format('l'))
                console.log("----------------------------------------")
            })
        }
    });
}
function movieThis(movie) {
    var movieUrl = "http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=trilogy";
    request(movieUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Movie Title: " + movie.Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("----------------------------------------")
        }
    })
}

function spotifyThis(song) {
    spotify.search({ type: "track", query: song }, function (error, data) {
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

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        data = data.split(", ");

        if (data[0] === "spotify-this-song") {
            var song = data[1];
            spotify.search({ type: "track", query: song }, function (error, data) {
                if (error) {
                    return console.log("Something went wrong: " + error);
                }

                var songItems = data.tracks.items;
                songItems.forEach(key => {
                    console.log("Song Name: " + key.name),
                        console.log("Artist Name: " + key.artists[0].name),
                        console.log("Album Name: " + key.album.name),
                        console.log("Link: " + key.href)
                    console.log("----------------------------------------")
                })
            });
        } else if (data[0] === "movie-this") {
            var movie = data[1];
            var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            request(movieUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("Movie Title: " + movie);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("----------------------------------------")
                }
            });
        } else if (data[0] === "concert-this") {
            var band = data[1];
            var concertURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
            request(concertURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    var bandArray = JSON.parse(body)
                    bandArray.forEach(function (event) {
                        console.log("Venue name: ", event.venue.name)
                        console.log("Venue city: ", event.venue.city)
                        console.log("Concert date: ", moment(event.datetime).format('l'))
                        console.log("----------------------------------------")
                        //Concert-this works regularly but not inside of do-what-it-says
                    })
                }
            });
        };
    })
}

