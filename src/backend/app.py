from flask import Flask, request, redirect, jsonify, render_template
import mysql.connector
from mysql.connector.errors import PoolError
import mysql.connector.pooling
import json
from algo import closest_songs
import requests
import sys
import os
sys.path.append(os.getcwd())
from song import *
from auth import get_auth
from src.database.populate_db import create_and_insert_to_db

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")

# Connects to the database specified by environment variables (heroku), if none provided connect to a local mysql
db_config = {
    "host":os.getenv('DATABASE_URL', 'localhost'),
    "user":os.getenv('DATABASE_USERNAME', 'root'),
    "password":os.getenv('DATABASE_PASS', ''),
    "database":os.getenv('DATABASE_DB_NAME', 'SpotifySongs'),
}
connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    **db_config,
    pool_name = "flaskpool",
    pool_size = 3,
    pool_reset_session=False,
    autocommit=True,
    )

def getConnectionFromPool():
    try:
        cnx = connection_pool.get_connection()
    except PoolError:
        connection_pool.add_connection()
        cnx = connection_pool.get_connection()
        
    cursor = cnx.cursor()
    return cnx, cursor

def returnConnection(cnx, cursor):
    cursor.close()
    cnx.close()


# Access token from environment variable (local only)
access_token = get_auth(1)

# Header to send with every request to Spotify's API
head = {'Authorization': 'Bearer ' + access_token}

# Route that returns a formatted list of tracks and artists based on search terms given in parameters
# REQ. PARAMS: 'q' or the search term/phrase and 'type' of either track or artist
@app.route("/apiSearch", methods=['GET'])
def apiSearch():
    if request.method == 'GET':
        params = request.args
        q = params.get('q', None)
        relation = params.get('type', 'track')
        if q != None:
            try:
                #call spotify api and return a JSON response of images, song names, artist
                url = 'https://api.spotify.com/v1/search'
                q = q.replace(" ", "%20")
                queryparam = '?q=' + q + '&type=' + relation + '&limit=10'
                req = requests.get(url + queryparam, headers=head)
                mydb, mycursor = getConnectionFromPool()
    
                if relation == 'track':  # if a track, add all returned tracks from the API into DB, then format a JSON response of the tracks
                    create_and_insert_to_db(req.json().get("tracks").get("items"), mycursor, False, head, mydb)
                    response = req.json().get("tracks").get("items")
                    tracks = []
                    for track in response:
                        tracks.append({"images": track.get("album").get("images"), "artist_name": track.get("artists")[0].get("name"), 
                        "track_name": track.get("name"), "id": track.get("id")})
                    return_dict = {"items": tracks}
                else:  # if requested an artist, format a JSON response of the tracks
                    response = req.json().get("artists").get("items")
                    artists = []
                    for artist in response:
                        artists.append({"images": artist.get("images"), "artist_name": artist.get("name"), "id": artist.get("id")})
                    return_dict = {"items": artists}
                returnConnection(mydb, mycursor)
                return json.dumps(return_dict)
            except Exception as e:
                # error page
                return redirect("/error?msg=Something_went_wrong_with_your_request&error=" + str(e))  # redirect to error message if an error occurs
        else:
            return redirect("/error?msg=Please_add_a_search_parameter")
    else: 
        return redirect("/error?msg=Invalid_HTTP_method")


# Route to handle searching for songs through a set of weight values for song attributes. Returns a JSON response of a list of closely related songs.
# REQ. PARAMS: 'd' for danceability, 'a' for acousticness, 'v' for valence, 'i' for instrumentalness, 'e' for energy (numbers)
@app.route("/apiWeights")
def searchByWeights():
    if request.method == 'GET':
        try:
            mydb, mycursor = getConnectionFromPool()
            params = request.args
            danceability = float(params.get('d'))
            acousticness = float(params.get('a'))
            valence = float(params.get('v'))
            instrumentalness = float(params.get('i'))
            energy = float(params.get('e'))
            
            # creates a mock song, 'target_song', with the specified song attributes with default (average) values for non-customizable song attributes
            target_song_dict = {'acousticness': acousticness, 'danceability': danceability, 'valence': valence, 'instrumentalness': instrumentalness, 'energy': energy,
            'key_scale': 5, 'liveness': .16, 'loudness': -6, 'mode': .6, 'speechiness': .11, 'tempo': 121, 'time_signature': 4, 'duration_ms': 200000}


            # query all songs, comparison will be made to each, returning the ones that are most similar
            all_songs_query = ('SELECT * FROM Song')
            mycursor.execute(all_songs_query)
            col_names = mycursor.column_names
            all_songs = mycursor.fetchall()
                
            list_of_songs = []
            all_song_columns = col_names
            # for every song in the database, convert it into a Song object and add it to the list list_of_songs
            for song in all_songs:
                temp_song_dict = format_song(all_song_columns, song)
                temp_song_dict['artist_name'] = ""
                list_of_songs.append(Song(temp_song_dict))

            #closest_songs(Target song, list of songs, number of closest songs to output)
            target_song = Song(target_song_dict)
            similar_songs = closest_songs(target_song, list_of_songs, 10) 
                
            returnDict = {}
            similar_song_attributes = []

            # for every song in the most closest songs, format a JSON representation to be send as a response
            for song in similar_songs:
                song.artist_name = get_artist_name(mycursor, song.artist_id)
                similar_song_attributes.append(song.get_core_attributes())
            returnDict["similar_songs"] = similar_song_attributes
            returnConnection(mydb, mycursor)
            return returnDict
        except:
            returnConnection(mydb, mycursor)
            return redirect("/error?msg=Please_add_a_search_parameter")
    else: 
        return redirect("/error?msg=Invalid_HTTP_method")

# Route that if given an track id parameter, returns a formatted JSON response of the track's statistics and most similar songs.
# REQ. Param:  'track_id' for track id
@app.route("/api/track")
def trackProfile():
    if request.method == 'GET':
        try:
            params = request.args
            track_id = params.get('track_id', None)
            mydb, mycursor = getConnectionFromPool()

            if track_id != None:
                # Request track information from Spotify API and format the data returned
                req = requests.get('https://api.spotify.com/v1/tracks/' + track_id, headers = head)

                if (req.status_code != 200):
                    print(str(req.status_code))
                    print(str(req.json()))
                    return redirect("/error?msg=Invalid_track_id")
                artist_name = req.json().get("album").get("artists")[0].get("name")
                popularity = req.json().get("popularity")

                # Find the song that is specified from our database and convert it into a dictionary object
                query = ('SELECT * FROM Song WHERE id = %s')
                mycursor.execute(query, (track_id,))
                track = mycursor.fetchone()
                col_names = mycursor.column_names
                target_song_dict = format_song(col_names, track)

                # Get every song in our database
                all_songs_query = ('SELECT * FROM Song')
                mycursor.execute(all_songs_query)
                all_songs = mycursor.fetchall()
                
                list_of_songs = []
                all_song_columns = mycursor.column_names

                # For every song in the database, create a Song object and add it to list_of_songs array
                for song in all_songs:
                    temp_song_dict = format_song(all_song_columns, song)
                    temp_song_dict['artist_name'] = ""
                    list_of_songs.append(Song(temp_song_dict))

                # Format the data of the specified track (artist name) and get the closest songs for the specified track
                target_song_dict['artist_name'] = get_artist_name(mycursor, target_song_dict.get('artist_id'))
                target_song = Song(target_song_dict)
                similar_songs = closest_songs(target_song, list_of_songs, 10) #closest_songs(Target song, list of songs, number of closest songs to output)
                
                
                returnTrack = format_song(col_names, track)
                similar_song_attributes = []

                # For all of the closest songs of the specified track, get the artist_id and the song's core attributes
                for song in similar_songs:
                    song.artist_name = get_artist_name(mycursor, song.artist_id)
                    similar_song_attributes.append(song.get_core_attributes())
                returnTrack["similar_songs"] = similar_song_attributes
                returnTrack["artist_name"] = artist_name
                returnTrack["popularity"] = popularity
                returnConnection(mydb, mycursor)
                return returnTrack
            else:
                returnConnection(mydb, mycursor)
                return redirect("/error?msg=Please_add_the_correct_query_parameters")
        except Exception as e:
            returnConnection(mydb, mycursor)
            return redirect("/error?msg=" + str(e).replace(" ", "_"))  # Redirect user to the error page with error message
    else:
        return redirect("/error?msg=Invalid_HTTP_method")

# Route that if given an artist id parameter, returns a formatted JSON response of the artist's most popular songs and statistics.
# REQ. Param:  'artist_id' for artist id
@app.route("/api/artist")
def artistProfile():
    if request.method == 'GET':
        try:
            params = request.args
            artist_id = params.get('artist_id', None)  
            if artist_id != None:
                mydb, mycursor = getConnectionFromPool()
                # Find the specified artist in the database
                song_query = ('SELECT * FROM Song WHERE artist_id = %s')

                # Access the Spotify API for artist information and format the data returned
                result = {}
                url = 'https://api.spotify.com/v1/artists/'
                req = requests.get(url + artist_id, headers=head)
                if (req.status_code != 200):
                    return redirect("/error?msg=Invalid_artist_id")
                result["follower-count"] = req.json().get("followers").get("total")
                result["genres"] = req.json().get("genres")
                result["images"] = req.json().get("images")
                result["popularity"] = req.json().get("popularity")
                result["artist_name"] = req.json().get("name")
                result["artist_id"] = req.json().get("id")

                # Get the top tracks for the specified artist
                req_for_top_tracks = requests.get(url + artist_id + "/top-tracks?market=US", headers=head)
                create_and_insert_to_db(req_for_top_tracks.json().get("tracks"), mycursor, False, head, mydb)

                mycursor.execute(song_query, (artist_id,))
                artist_songs = mycursor.fetchall()
                    
                songs = []
                for song in artist_songs:
                    songs.append(format_song(mycursor.column_names, song))

                result["discography"] = songs
                returnConnection(mydb, mycursor)
                return jsonify(result)
            else:
                return redirect("/error?msg=Please_add_an_artist_id_parameter")
        except Exception as e:
            return redirect("/error?msg=" + str(e).replace(" ", "_")) # Redirect user to the error page with error message
    else:
        return redirect("/error?msg=Invalid_HTTP_Request")

@app.route("/api/random")
def getRandomSong(): 
    if request.method == 'GET':
        try:
            mydb, mycursor = getConnectionFromPool()
            random_query = ('SELECT id FROM Song ORDER BY RAND() LIMIT 1')
            mycursor.execute(random_query)
            song_id = mycursor.fetchone()[0]
            returnConnection(mydb, mycursor)
            return  json.dumps({"id": song_id})
        except Exception as e:
            returnConnection(mydb, mycursor)
            return redirect("/error?msg=" + str(e).replace(" ", "_")) # Redirect user to the error page with error message
    else:
        return redirect("/error?msg=Invalid_HTTP_Request")

# Route to the homepage! Returns the React App.
@app.route("/")
def index():
    return render_template('index.html')

# All error pages are rendered client side, all /error requests should be served the React App.
@app.route("/error")
def error():
    return render_template('index.html')

# For 404 errors, render the React App, error handling is done client side
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# Given column names and a track (tuple representation), return a dictionary object representation of the track
def format_song(col_names, track):
    song_dict = {}
    for (col_name, attribute) in zip(col_names, track):
        song_dict[col_name] = attribute
    return song_dict

# Given an artist_id and the cursor to a database, return the artist name associated with the artist_id
def get_artist_name(mycursor, artist_id):
    artist_name_query = ('SELECT artist_name FROM Artist WHERE artist_id = %s')
    mycursor.execute(artist_name_query, (artist_id,))
    return mycursor.fetchone()[0]
    
# App entry point, creates the app on the environment variable of PORT, otherwise use 5000
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)