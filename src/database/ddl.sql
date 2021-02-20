CREATE DATABASE SpotifySongs;
USE SpotifySongs;

CREATE TABLE Artist (
    artist_id varchar(50) NOT NULL,
    artist_name varchar(100) NOT NULL,
    PRIMARY KEY(artist_id)
);

CREATE TABLE Song (
    id varchar(50) NOT NULL,
    title varchar(100) NOT NULL,
    artist_id varchar(50) NOT NULL,
    img_link varchar(100),
    album varchar(100),
    acousticness double,
    danceability double,
    duration_ms double,
    energy double,
    instrumentalness double,
    key_scale double,
    liveness double,
    loudness double,
    mode double,
    speechiness double,
    tempo double,
    time_signature double,
    valence double,
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id) 
);

