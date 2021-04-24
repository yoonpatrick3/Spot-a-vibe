from flask import Flask, request, redirect, jsonify, render_template
import mysql.connector
import json
from algo import closest_songs
import requests
import sys
import os
sys.path.append(os.getcwd())
from src.song import *
from src.auth import get_auth
from src.database.populate_db import create_and_insert_to_db

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")

mydb = mysql.connector.connect(
    host=os.getenv('DATABASE_URL', 'localhost'),
    user=os.getenv('DATABASE_USERNAME', 'root'),
    password=os.getenv('DATABASE_PASS', ''),
    database=os.getenv('DATABASE_DB_NAME', 'SpotifySongs')
    )
mycursor = mydb.cursor()

# save the access token
access_token = get_auth(1)

head = {'Authorization': 'Bearer ' + access_token}


@app.route("/apiSearch", methods=['GET'])
def apiSearch():
    if request.method == 'GET':
        params = request.args
        q = params.get('q', None)
        relation = params.get('type', 'track')
        if q != None:
            #call spotify api and return a JSON response of images, song names, artist
            url = 'https://api.spotify.com/v1/search'
            q = q.replace(" ", "%20")
            queryparam = '?q=' + q + '&type=' + relation + '&limit=10'
            req = requests.get(url + queryparam, headers=head)
            #add into our database
            try:
                if relation == 'track':
                    create_and_insert_to_db(req.json().get("tracks").get("items"), mycursor, False, head, mydb)
                    response = req.json().get("tracks").get("items")
                    tracks = []
                    for track in response:
                        tracks.append({"images": track.get("album").get("images"), "artist_name": track.get("artists")[0].get("name"), 
                        "track_name": track.get("name"), "id": track.get("id")})
                    return_dict = {"items": tracks}
                    return json.dumps(return_dict)
                else:
                    response = req.json().get("artists").get("items")
                    artists = []
                    for artist in response:
                        artists.append({"images": artist.get("images"), "artist_name": artist.get("name"), "id": artist.get("id")})
                    return_dict = {"items": artists}
                    return json.dumps(return_dict)
            except ValueError:
                # error page
                return redirect("/error?msg=Something_went_wrong_with_your_request")
        else:
            return redirect("/error?msg=Please_add_a_search_parameter")
    else: 
        return redirect("/error?msg=Invalid_HTTP_method")

@app.route("/api/track")
def trackProfile():
    if request.method == 'GET':
        params = request.args
        track_id = params.get('track_id', None)
        
        #query from db
        if track_id != None:
            req = requests.get('https://api.spotify.com/v1/tracks/' + track_id, headers = head)
            artist_name = req.json().get("album").get("artists")[0].get("name")
            popularity = req.json().get("popularity")

            query = ('SELECT * FROM Song WHERE id = %s')
            mycursor.execute(query, (track_id,))
            track = mycursor.fetchone()
            col_names = mycursor.column_names

            target_song_dict = format_song(col_names, track)
            

            #
            all_songs_query = ('SELECT * FROM Song')
            mycursor.execute(all_songs_query)
            all_songs = mycursor.fetchall()
            
            list_of_songs = []
            all_song_columns = mycursor.column_names
            for song in all_songs:
                temp_song_dict = format_song(all_song_columns, song)


                # artist_name_query = ('SELECT artist_name FROM Artist WHERE artist_id = %s')
                # mycursor.execute(artist_name_query, temp_song_dict['artist_id'])
                # temp_song_dict["artist_name"] = mycursor.fetchone()[0]
                
                temp_song_dict['artist_name'] = get_artist_name(mycursor, temp_song_dict.get('artist_id'))
                
                list_of_songs.append(Song(temp_song_dict))

            # target_song_dict = format_song(mycursor.column_names, track)
            target_song_dict['artist_name'] = get_artist_name(mycursor, target_song_dict.get('artist_id'))
            target_song = Song(target_song_dict)
            similar_songs = closest_songs(target_song, list_of_songs, 10) #closest_songs(Target song, list of songs, number of closest songs to output)
            #
            
            returnTrack = format_song(col_names, track)
            similar_song_attributes = []
            for song in similar_songs:
                similar_song_attributes.append(song.get_core_attributes())
            returnTrack["similar_songs"] = similar_song_attributes
            returnTrack["artist_name"] = artist_name
            returnTrack["popularity"] = popularity
            return returnTrack
        else:
            return redirect("/error?msg=Please_add_a_track_id_parameter")
    else:
        return redirect("/error?msg=Invalid_HTTP_method")
        
@app.route("/api/artist")
def artistProfile():
    if request.method == 'GET':
        params = request.args
        artist_id = params.get('artist_id', None)
        if artist_id != None:
            #query from db
            #return as json
            song_query = ('SELECT * FROM Song WHERE artist_id = %s')

            result = {}
            #get spotify data for the artist
            url = 'https://api.spotify.com/v1/artists/'
            req = requests.get(url + artist_id, headers=head)
            result["follower-count"] = req.json().get("followers").get("total")
            result["genres"] = req.json().get("genres")
            result["images"] = req.json().get("images")
            result["popularity"] = req.json().get("popularity")
            result["artist_name"] = req.json().get("name")
            result["artist_id"] = req.json().get("id")

            req_for_top_tracks = requests.get(url + artist_id + "/top-tracks?market=US", headers=head)
            create_and_insert_to_db(req_for_top_tracks.json().get("tracks"), mycursor, False, head, mydb)


            mycursor.execute(song_query, (artist_id,))
            artist_songs = mycursor.fetchall()
                
            songs = []
            for song in artist_songs:
                songs.append(format_song(mycursor.column_names, song))

            result["discography"] = songs
                
            return jsonify(result)
        else:
            return redirect("/error?msg=Please_add_an_artist_id_parameter")
    else:
        return redirect("/error?msg=Invalid_HTTP_Request")

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/error")
def error():
    return render_template('index.html')

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

def format_song(col_names, track):
    song_dict = {}
    for (col_name, attribute) in zip(col_names, track):
        song_dict[col_name] = attribute
    return song_dict

def get_artist_name(mycursor, artist_id):
    artist_name_query = ('SELECT artist_name FROM Artist WHERE artist_id = %s')
    mycursor.execute(artist_name_query, (artist_id,))
    return mycursor.fetchone()[0]
    

if __name__ == '__main__':
    app.run(port="5000", debug=True)


#TODO: add query param support for error messages, connect artist and track pages to songcard