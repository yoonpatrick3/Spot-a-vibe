import numpy as np
import sys
import os
sys.path.append(os.getcwd())
from src.song import *

# Finds the difference in a circular array
def find_circular_diff(num1: int, num2: int, circular_array: list) -> int:
    p1 = num1
    p2 = num2
    if num2 < num1:
        p1 = num2
        p2 = num1
    
    dist1 = p2 - p1
    dist2 = p1 + len(circular_array) - p2 

    return min(dist1,dist2)

# Squared difference noramlized to 0 and 1
def scaled_squared_difference(num1: int, num2: int) -> float:
    maxnum = max(abs(num1), abs(num2))
    return ((num1-num2) / maxnum) ** 2

# Squared difference normalized to 0 and 1 within a circular array
def scaled_squared_difference_circular(num1: int, num2: int, circular_array: list) -> float:
    return (find_circular_diff(num1, num2, circular_array) / 6) **2

# Finds the residual squared sum of all the song features
def residual_square_sum(song1: Song, song2: Song) -> float:
    list_of_features = [scaled_squared_difference(song1.acousticness, song2.acousticness),
                       scaled_squared_difference(song1.danceability, song2.danceability),
                       scaled_squared_difference(song1.duration_ms, song2.duration_ms),
                       scaled_squared_difference(song1.energy, song2.energy),
                       scaled_squared_difference(song1.instrumentalness, song2.instrumentalness),
                       scaled_squared_difference_circular(song1.key_scale, song2.key_scale, range(12)),
                       scaled_squared_difference(song1.liveness, song2.liveness),
                       scaled_squared_difference(song1.mode, song2.mode),
                       scaled_squared_difference(song1.speechiness, song2.speechiness),
                       scaled_squared_difference(song1.tempo, song2.tempo),
                       scaled_squared_difference(song1.time_signature, song2.time_signature),
                       scaled_squared_difference(song1.valence, song2.valence)]
    return np.sum(list_of_features)

# Finds the n-closest songs given a list of songs and a target songs
def closest_songs(target_song: Song, list_of_songs: list, num_songs: int) -> list:
    if num_songs >= len(list_of_songs):
        num_songs = len(list_of_songs)-1
    list_of_residuals = []
    for song in list_of_songs:
        list_of_residuals.append(residual_square_sum(target_song, song))
    npar = np.array(list_of_residuals)
    n_lowest_index = np.argpartition(npar, num_songs)[:num_songs]
    sorted_indices = n_lowest_index[np.argsort(npar[n_lowest_index])]

    npar_songs = np.array(list_of_songs)
    closest_songs = npar_songs[sorted_indices]

    return closest_songs