from dotenv import load_dotenv
import requests
import os

load_dotenv()

client_id1 = os.getenv('CLIENT_ID1')
client_secret1 = os.getenv('CLIENT_SECRET1')

client_id2 = os.getenv('CLIENT_ID2')
client_secret2 = os.getenv('CLIENT_SECRET2')

client_id3 = os.getenv('CLIENT_ID3')
client_secret3 = os.getenv('CLIENT_SECRET3')

# Getting the authorization token from Spotify
AUTH_URL = 'https://accounts.spotify.com/api/token'

def get_auth(token_number: int) -> str:
    if token_number == 1:
        auth_response = requests.post(AUTH_URL, {
            'grant_type': 'client_credentials',
            'client_id': client_id1,
            'client_secret': client_secret1,
        })
    elif token_number == 2:
        auth_response = requests.post(AUTH_URL, {
            'grant_type': 'client_credentials',
            'client_id': client_id2,
            'client_secret': client_secret2,
        })
    elif token_number == 3:
        auth_response = requests.post(AUTH_URL, {
            'grant_type': 'client_credentials',
            'client_id': client_id3,
            'client_secret': client_secret3,
        })
    else:
        return None
    # convert the response to JSON
    auth_response_data = auth_response.json()
    # save the access token
    access_token = auth_response_data['access_token']
    return access_token

