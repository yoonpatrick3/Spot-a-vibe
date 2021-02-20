class Song:
    
    def __init__(self, song_dict):
        self.id = id
        self.title = title
        self.artist_id = artist_id
        self.artist_name = artist_name
        self.img_link = img_link
        self.album = album
        self.danceability = audio_features.get("danceability")
        self.energy = audio_features.get("energy")
        self.key_scale = audio_features.get("key")
        self.loudness = audio_features.get("loudness")
        self.mode = audio_features.get("mode")
        self.speechiness = audio_features.get("speechiness")
        self.acousticness = audio_features.get("acousticness")
        self.instrumentalness = audio_features.get("instrumentalness")
        self.liveness = audio_features.get("liveness")
        self.valence = audio_features.get("valence")
        self.tempo = audio_features.get("tempo")
        self.time_signature = audio_features.get("time_signature")
        self.duration_ms = audio_features.get("duration_ms")

    # Sets the audio features
    def set_audio_features(self, audio_features):
        # audio_features = attributes.get("audio_features")

        self.danceability = audio_features.get("danceability")
        self.energy = audio_features.get("energy")
        self.key_scale = audio_features.get("key")
        self.loudness = audio_features.get("loudness")
        self.mode = audio_features.get("mode")
        self.speechiness = audio_features.get("speechiness")
        self.acousticness = audio_features.get("acousticness")
        self.instrumentalness = audio_features.get("instrumentalness")
        self.liveness = audio_features.get("liveness")
        self.valence = audio_features.get("valence")
        self.tempo = audio_features.get("tempo")
        self.time_signature = audio_features.get("time_signature")
        self.duration_ms = audio_features.get("duration_ms")

    def get_tuple(self):
        return (self.id, self.title, self.artist_id, self.img_link, self.album, self.acousticness, 
        self.danceability, self.duration_ms, self.energy, self.instrumentalness, self.key_scale, 
        self.liveness, self.loudness, self.mode, self.speechiness, self.tempo, self.time_signature, self.valence)
        
    # ToString method
    def __str__(self) -> str:
        string = "id: " + str(self.id) + " title: " + self.title + " artist_id: " + self.artist_id + " album: " + self.album + '\n'
        return string
    