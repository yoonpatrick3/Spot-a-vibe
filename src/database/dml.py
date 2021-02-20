import os
from .. import song
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
playlist_id = '2YRe7HRKNRvXdJBp9nXFza' # 500 most popular Spotify songs
head = {'Authorization': 'Bearer ' + access_token}

song_json = requests.get(url + playlist_id, headers=head)

list_of_tracks = song_json.json().get("tracks").get("items")

list_of_track_names = []
list_of_track_id = []

for track in list_of_tracks:
    list_of_track_names.append(track.get("track").get("name"))

print(list_of_track_names)

#print(song_json.json().get("description"))

# url for audio features
# audio_url = 'https://api.spotify.com/v1/audio-features/'
# song_id = '4P66rfizAl2nIJCICSMymC'

# audio_features = requests.get(audio_url + song_id, headers=head)
# print(audio_features.json())
