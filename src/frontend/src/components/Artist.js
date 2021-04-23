import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import CardHolder from './CardHolder'
import SongCard from './Card'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    medium: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    large: {
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
  }));


function ArtistProfile(props) {
    const [artistData, setArtistData] = useState({})
    const classes = useStyles();

    useEffect(() => {
        fetch(`http://localhost:5000/api/artist?artist_id=${props.id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let danceability = 0;
                let positivity = 0;
                let acousticness = 0;
                let energy = 0;
                let instrumentalness = 0;
                let liveness = 0;
                let loudness = 0;
                let speechiness = 0;
                let popularity = `${data.popularity}/100`;

                data.discography.forEach(song => {
                    danceability += song.danceability;
                    positivity += song.valence;
                    acousticness += song.acousticness;
                    energy += song.energy;
                    instrumentalness += song.instrumentalness;
                    liveness += song.liveness;
                    loudness += song.loudness;
                    speechiness += song.speechiness;
                })
                danceability /= data.discography.length;
                positivity /= data.discography.length;
                acousticness /= data.discography.length;
                energy /= data.discography.length;
                instrumentalness /= data.discography.length;
                liveness /= data.discography.length;
                loudness /= data.discography.length;
                speechiness /= data.discography.length;

                danceability = danceability.toFixed(2)
                positivity = positivity.toFixed(2)
                acousticness = acousticness.toFixed(2)
                energy = energy.toFixed(2)
                instrumentalness = instrumentalness.toFixed(2)
                liveness = liveness.toFixed(2)
                loudness = loudness.toFixed(2)
                speechiness = speechiness.toFixed(2)


                let discography = data.discography.map(song => {
                    return <SongCard style={{ 'min-height': '100px' }} id={song.id} trackArtist={data.artist_name}
                        trackName={song.title} imageURL={song.img_link} type="track"></SongCard>
                })

                setArtistData({
                    artist_name: data.artist_name,
                    artist_image: data.images.length > 0 ? data.images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png',
                    danceability: danceability,
                    positivity: positivity,
                    acousticness: acousticness,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    liveness: liveness,
                    loudness: loudness,
                    speechiness: speechiness,
                    discography: discography,
                    popularity: popularity,
                    followers: data["follower-count"],
                    genres: data.genres,
                    discography: discography
                })
            })
    }, [props.id])


    return (
        <div className="artist-profile">
            {artistData.artist_name ?
                <>
                    <div className="artist-intro">
                        <Avatar src={artistData.artist_image} alt={`Profile picture of ${artistData.artist_name}`} className={classes.large} />
                        <h1>{artistData.artist_name}</h1>
                    </div>
                    <div className="artist-data">
                        <p>Genres: {artistData.genres}</p>
                        <p>Followers: {artistData.followers}</p>
                        <p>Popularity: {artistData.popularity}</p>
                    </div>
                    <div className="artist-music-stats">
                        <h2>Stats:</h2>
                        <p>Danceability: {artistData.danceability}</p>
                        <p>Positivity: {artistData.positivity}</p>
                        <p>Acousticness: {artistData.acousticness}</p>
                        <p>Energy: {artistData.energy}</p>
                        <p>Instrumentalness: {artistData.instrumentalness}</p>
                        <p>Liveness: {artistData.liveness}</p>
                        <p>Loudness: {artistData.loudness}</p>
                        <p>Speechiness: {artistData.speechiness}</p>
                    </div>
                    <CardHolder cards={artistData.discography} />
                </> : <></>}
        </div>
    )
}

function Artist(props) {
    let artistID = props.id;
    return (
        <>{artistID ? <ArtistProfile id={artistID} /> : <Redirect to="/"></Redirect>}</>
    )
}

export default Artist;