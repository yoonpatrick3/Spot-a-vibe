import mysql.connector
import sys
import os
sys.path.append(os.getcwd())
from src.song import *
import requests
from dotenv import load_dotenv

load_dotenv()
#pip install python-dotenv

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

#SET UP DB CONNECTION
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="SpotifySongs"
)
mycursor = mydb.cursor()

# Getting the authorization token from Spotify
AUTH_URL = 'https://accounts.spotify.com/api/token'

auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
})

# convert the response to JSON
auth_response_data = auth_response.json()
# save the access token
access_token = auth_response_data['access_token']

# populating the database with a playlist of the most popular songs
url = 'https://api.spotify.com/v1/playlists/'
playlist_id = '2YRe7HRKNRvXdJBp9nXFza' # 500 most popular Spotify songs
# playlist_id = '37i9dQZEVXbLRQDuF5jeBp' # Top 50 in US
queryparam = '?offset='
offset = 0
head = {'Authorization': 'Bearer ' + access_token}

list_of_tracks = []

# spotify limits us to 100 tracks so we get offset by 100 every time
while offset < 600:
    song_json = requests.get(url + playlist_id + '/tracks' + queryparam + str(offset), headers=head)
    print(song_json.text)
    list_of_tracks += song_json.json().get('items')
    offset += 100

list_of_songs = []

audio_url = 'https://api.spotify.com/v1/audio-features/'

# create a Song object for every track
for t in list_of_tracks:
    track = t.get('track')
    album = track.get('album')

    track_name = track.get('name')
    track_id = track.get('id')
    img_link = album.get('images')[0].get('url')
    track_album = album.get('name')
    artist_id = album.get('artists')[0].get('id')
    artist_name = album.get('artists')[0].get('name')
    
    # set the audio features of this song
    song = Song(track_id, track_name, artist_id, artist_name, img_link, track_album)
    audio_features = requests.get(audio_url + track_id, headers=head)
    song.set_audio_features(audio_features.json())

    list_of_songs.append(song)

artist_sql = ("INSERT INTO Artist(artist_id, artist_name) VALUES (%s, %s)")
artist_val = []
for song in list_of_songs:
    artist_val.append((song.artist_id, song.artist_name))

artist_val = list(set(artist_val))

mycursor.executemany(artist_sql, artist_val)
mydb.commit()

song_sql = ("INSERT INTO Song (id, title, artist_id, img_link, album, acousticness, danceability, duration_ms, energy, " +
"instrumentalness, key_scale, liveness, loudness, mode, speechiness, tempo, time_signature, valence) " + 
"VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
song_val = []
for song in list_of_songs:
    song_val.append(song.get_tuple())

mycursor.executemany(song_sql, song_val)
mydb.commit()

mycursor.close()
mydb.close()

#url for audio features
# audio_url = 'https://api.spotify.com/v1/audio-features/'
# song_id = '4P66rfizAl2nIJCICSMymC'

# audio_features = requests.get(audio_url + song_id, headers=head)
# print(audio_features.json())
