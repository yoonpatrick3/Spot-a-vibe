# Represents a musical track storing attributes like artist id, artist name, title, danceability, instrumentalness and other song attributes.
class Song:
    
    def __init__(self, song_dict):
        self.id = song_dict.get("id")
        self.title = song_dict.get("title")
        self.artist_id = song_dict.get("artist_id")
        self.artist_name = song_dict.get("artist_name")
        self.img_link = song_dict.get("img_link")
        self.album = song_dict.get("album")
        self.danceability = song_dict.get("danceability")
        self.energy = song_dict.get("energy")
        self.key_scale = song_dict.get("key_scale")
        self.loudness = song_dict.get("loudness")
        self.mode = song_dict.get("mode")
        self.speechiness = song_dict.get("speechiness")
        self.acousticness = song_dict.get("acousticness")
        self.instrumentalness = song_dict.get("instrumentalness")
        self.liveness = song_dict.get("liveness")
        self.valence = song_dict.get("valence")
        self.tempo = song_dict.get("tempo")
        self.time_signature = song_dict.get("time_signature")
        self.duration_ms = song_dict.get("duration_ms")

    # Returns a tuple of all attributes of this Song
    def get_tuple(self):
        return (self.id, self.title, self.artist_id, self.img_link, self.album, self.acousticness, 
        self.danceability, self.duration_ms, self.energy, self.instrumentalness, self.key_scale, 
        self.liveness, self.loudness, self.mode, self.speechiness, self.tempo, self.time_signature, self.valence)
        
    # ToString method
    def __str__(self) -> str:
        string = "id: " + str(self.id) + " title: " + self.title + " artist_id: " + self.artist_id + " album: " + self.album + '\n'
        return string

    # Gets the core attribtues of this Song (image link, artist name, artist id, title of song, album title, and track id)
    def get_core_attributes(self):
        return {"img_link": self.img_link, 'artist_name': self.artist_name, 'artist_id': self.artist_id, 'title': self.title, 'album': self.album, 'id': self.id}
    