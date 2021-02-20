class Song:
    
    def __init__(self, id, title, artist_id, img_link, album, acousticness, 
    danceability, duration_ms, energy, instrumentalness, key_scale,
    liveness, loudness, mode, speechiness, tempo, time_signature, valence):
        self.id = id
        self.title = title
        self.artist_id = artist_id
        self.img_link = img_link
        self.album = album
        self.acousticness = acousticness
        self.danceability = danceability
        self.duration_ms = duration_ms
        self.energy = energy
        self.instrumentalness = instrumentalness
        self.key_scale = key_scale
        self.liveness = liveness
        self.loudness = loudness
        self.mode = mode
        self.speechiness = speechiness
        self.tempo = tempo
        self.time_signature = time_signature
        self.valence = valence

    