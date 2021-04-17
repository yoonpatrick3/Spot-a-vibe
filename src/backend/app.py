from flask import Flask, request, redirect, jsonify, render_template
import mysql.connector
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
  host="localhost",
  user="root",
  password="",
  database="SpotifySongs"
)
mycursor = mydb.cursor()

# save the access token
access_token = get_auth(1)


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
            head = {'Authorization': 'Bearer ' + access_token}
            req = requests.get(url + queryparam, headers=head)
            #add into our database
            try:
                if relation == 'track':
                    #create_and_insert_to_db(req.json().get("tracks").get("items"), mycursor, False, head, mydb)
                    return req.json().get("tracks")
                else:
                    return req.json().get("artists")
            except:
                # error page
                return redirect("/error?msg=Something_went_wrong_with_your_request")
        else:
            return redirect("/error?msg=Please_add_a_search_parameter")
    else: 
        return redirect("/error?msg=Invalid_HTTP_method")

@app.route("/track")
def trackProfile():
    if request.method == 'GET':
        params = request.args
        track_id = params.get('track_id', None)
        #query from db
        if track_id != None:
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
            return returnTrack
        else:
            return redirect("/error?msg=Please_add_a_track_id_parameter")
    else:
        return redirect("/error?msg=Invalid_HTTP_method")
        
@app.route("/artist")
def artistProfile():
    if request.method == 'GET':
        params = request.args
        artist_id = params.get('artist_id', None)
        if artist_id != None:
            #query from db
            #return as json
            artist_query = ('SELECT * FROM Artist WHERE artist_id = %s')
            song_query = ('SELECT * FROM Song WHERE artist_id = %s')

            mycursor.execute(artist_query, (artist_id, ))
            artist = mycursor.fetchone()

            result = {}
            result["artist_name"] = artist[1]
            result["artist_id"] = artist[0]
            
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
    return "error"

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