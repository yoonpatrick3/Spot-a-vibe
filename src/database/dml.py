import os
# from .. import song
import requests
from dotenv import load_dotenv

load_dotenv()
#pip install python-dotenv

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

AUTH_URL = 'https://accounts.spotify.com/api/token'

# POST
auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
})
# convert the response to JSON
auth_response_data = auth_response.json()
# save the access token
access_token = auth_response_data['access_token']


url = 'https://api.spotify.com/v1/playlists/'
# playlist_id = '2YRe7HRKNRvXdJBp9nXFza' # 500 most popular Spotify songs
playlist_id = '37i9dQZEVXbLRQDuF5jeBp' # Top 50 in US
head = {'Authorization': 'Bearer ' + access_token}

song_json = requests.get(url + playlist_id, headers=head)

list_of_tracks = song_json.json().get("tracks").get("items")

list_of_track_names = []
list_of_track_id = []
list_of_img_links = []
list_of_albums = []
list_of_artists = []

for track in list_of_tracks:
    track = track.get('track')
    album = track.get('album')

    list_of_track_names.append(track.get('name'))
    list_of_track_id.append(track.get("id"))
    list_of_img_links.append(album.get('images')[0].get('url'))
    list_of_albums.append(album.get('name'))
    list_of_artists.append(album.get('artists')[0].get('name'))

print('=============TRACKS=================')
print(list_of_track_names)
print('=============IDS=================')
print(list_of_track_id)
print('=============IMG LINKS=================')
print(list_of_img_links)
print('=============ALBUMS=================')
print(list_of_albums)
print('=============ARTISTS=================')
print(list_of_artists)

#print(song_json.json().get("description"))

# url for audio features
# audio_url = 'https://api.spotify.com/v1/audio-features/'
# song_id = '4P66rfizAl2nIJCICSMymC'

# audio_features = requests.get(audio_url + song_id, headers=head)
# print(audio_features.json())
