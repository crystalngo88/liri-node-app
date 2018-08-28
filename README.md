# Liri Node App
Liri is a node app that has the ability to look up movies, songs, and bands using different commands. While in the document liri.js, the user can type into the terminal:

# n liri.js spotify-this-song "<song>" 
      Liri will return information about the artist, album name, and a link to the song via Spotify

# n liri.js concert-this "<band>"
      Liri will return information about upcoming shows, the name of the venue, the city of the show, and date of show using information from BandsInTown (band must be currently touring)

# n liri.js movie-this "<movie>" 
      Liri will return the title of movie, release year, release country, language, plot, and list of actors using information from OMDB/IMDB

# n liri.js do-what-it-says 
      Liri will look at the text in random.txt and execute the command written in it

# Log.txt
Each command written into node will be logged onto file log.txt
