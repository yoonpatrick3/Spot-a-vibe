import mysql.connector
import sys
import os
sys.path.append(os.getcwd())
from src.backend.song import *
import requests
import time
from src.backend.auth import get_auth

# Script that returns and populates a database with top 500 popular Spotify songs
def make_request():

    #SET UP DB CONNECTION
    mydb = mysql.connector.connect(
        host=os.getenv('DATABASE_URL', 'localhost'),
        user=os.getenv('DATABASE_USERNAME', 'root'),
        password=os.getenv('DATABASE_PASS', ''),
        database=os.getenv('SpotifySongs', 'SpotifySongs')
    )
    mycursor = mydb.cursor()

    # save the access token
    access_token = get_auth(1)

    # populating the database with a playlist of the most popular songs
    url = 'https://api.spotify.com/v1/playlists/'
    playlist_id = '2YRe7HRKNRvXdJBp9nXFza' # 500 most popular Spotify songs
    # playlist_id = '37i9dQZEVXbLRQDuF5jeBp' # Top 50 in US
    queryparam = '?offset='
    offset = 0
    head = {'Authorization': 'Bearer ' + access_token}

    list_of_tracks = []

    # Spotify limits us to 100 tracks so we get offset by 100 every time
    while offset < 600:
        song_json = requests.get(url + playlist_id + '/tracks' + queryparam + str(offset), headers=head)
        print(.2 * offset/100)
        list_of_tracks += song_json.json().get('items')
        offset += 100
    
    return head, mycursor, mydb, list_of_tracks

# Inserts a given list of tracks into a given database, each track is inputted with its audio attributes (danceability etc)
# FLAG parameter denotes whether the list of tracks has the shape [{Track.track1, Track.track2, ...}] or not ([Track1, Track2, ...])
def create_and_insert_to_db(list_of_tracks, mycursor, flag, head, mydb):
    audio_url = 'https://api.spotify.com/v1/audio-features/'
    list_of_songs = []

    # Only insert into database if it doesn't already exist
    #new_tracks = filterBasedByExistence(list_of_tracks, flag, mycursor, mydb)

    # For every new track, get the artist and audio features from the spotify API and insert it into the database
    for t in list_of_tracks:
        if flag:
            track = t.get('track')
        else:
            track = t
        album = track.get('album')
        
        
        track_id = track.get('id')
        track_name = track.get('name')
        img_link = album.get('images')[0].get('url')
        track_album = album.get('name')
        artist_id = album.get('artists')[0].get('id')
        artist_name = album.get('artists')[0].get('name')
        
        # set the audio features of this song
        song_dict = {}
        song_dict['id'] = track_id
        song_dict['title'] = track_name
        song_dict['artist_id'] = artist_id
        song_dict['artist_name'] = artist_name
        song_dict['img_link'] = img_link
        song_dict['album'] = track_album

        id_num = 1
        while id_num < 4:
            audio_features = requests.get(audio_url + track_id, headers=head)
            if audio_features.status_code != 200:
                id_num += 1
                access_token = get_auth(id_num)
                head = {'Authorization': 'Bearer ' + access_token}
                audio_features = requests.get(audio_url + track_id, headers=head)
            else:
                break
    
        try:
            song_dict.update(audio_features.json())
        except:
            print("Error msg cuz audio_features.json failed, status code: ", audio_features.status_code)
            return


        song_dict['key_scale'] = song_dict.pop('key')
        song = Song(song_dict)

        list_of_songs.append(song)
        

    artist_sql = ("INSERT IGNORE INTO Artist(artist_id, artist_name) VALUES (%s, %s)")
    artist_val = []
    for song in list_of_songs:
        artist_val.append((song.artist_id, song.artist_name))

    artist_val = list(set(artist_val))

    time.sleep(0.1)
    mycursor.executemany(artist_sql, artist_val)
    mydb.commit()

    song_sql = ("INSERT IGNORE INTO Song (id, title, artist_id, img_link, album, acousticness, danceability, duration_ms, energy, " +
    "instrumentalness, key_scale, liveness, loudness, mode, speechiness, tempo, time_signature, valence) " + 
    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    song_val = []
    for song in list_of_songs:
        song_val.append(song.get_tuple())
    print(list_of_songs)

    time.sleep(0.1)
    mycursor.executemany(song_sql, song_val)
    mydb.commit()


# Given a list of tracks, return the tracks that don't already exist
def filterBasedByExistence(list_of_tracks, flag, mycursor, mydb):
    filtered_values = []
    id_exists_query = ''
    id_tuple = ()
    for track in list_of_tracks:
        if flag:
            track = track.get('track')
        else:
            track = track
        track_id = track.get('id')
        id_tuple = id_tuple + (track_id, )
        if len(id_exists_query) > 0:
            id_exists_query += ' UNION ALL SELECT COUNT(*) FROM Song WHERE id = %s'
        else:
            id_exists_query += 'SELECT COUNT(*) FROM Song WHERE id = %s'
    mycursor.execute(id_exists_query, id_tuple)
    count_list = mycursor.fetchall()

    for (track, exists) in zip(list_of_tracks, count_list):
        if exists[0] == 0:
            filtered_values.append(track)
    return filtered_values

# Adds Spotify top 500 songs to the database
if __name__ == '__main__':
    head, mycursor, mydb, list_of_tracks = make_request()
    create_and_insert_to_db(list_of_tracks, mycursor, True, head, mydb)
    mycursor.close()
    mydb.close()

