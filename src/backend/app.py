from flask import Flask, request, redirect, jsonify
import mysql.connector

app = Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="SpotifySongs"
)
mycursor = mydb.cursor()

@app.route("/apiSearch", methods=['GET'])
def apiSearch():
    if request.method == 'GET':
        params = request.args
        q = params.get('q', None)
        relation = params.get('relation', 'track')
        if q:
            print('hi')
            #add into our database
            #call spotify api and return a JSON response of images, song names, artist
        else:
            return "Please add a search parameter.", 404
    else: 
        return "Invalid HTTP method", 404

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

            #
            all_songs_query = ('SELECT * FROM Song')
            mycursor.execute(all_songs_query)
            all_songs = mycursor.fetchall()
            
            for song in all_songs:
                song_dict = format_song(mycursor.column_names, song)
            #
            return format_song(col_names, track)
        else:
            return "Please add a track_id parameter.", 404
    else:
        return "Invalid HTTP method", 404
        
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
            return 'Please add an artist_id parameter', 404
    else:
        return "Please add a artist_id parameter.", 404


@app.route("/")
def index():
    return "homepage"

# def format_song(col_names, track):
#     return_string = '{'
#     for (col_name, attribute) in zip(col_names, track):
#             return_string += '\"' + col_name + '\"' +': ' + '\"' + str(attribute) + '\", '
#             return_string = return_string[0:len(return_string) - 2]
#     return return_string + '}'

def format_song(col_names, track):
    song_dict = {}
    for (col_name, attribute) in zip(col_names, track):
        song_dict[col_name] = attribute
    return song_dict
    

if __name__ == '__main__':
    app.run(port="3000", debug=True)