import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'


function ArtistProfile(props) {
    const [artistData, setArtistData] = useState({})

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

                let discography = data.discography.map(song => {
                    return {"track_name": song.title, "track_id": song.id, "image_link": song.img_link}
                })

                setArtistData({
                    artist_name: data.artist_name,
                    danceability: danceability,
                    positivity: positivity,
                    acousticness: acousticness,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    liveness: liveness,
                    loudness: loudness,
                    speechiness: speechiness,
                    artist_image: data.img_link,
                    discography: discography
                })
            })
    }, [props.id])


    return (
        <div className="artist-profile">
            <h1>{artistData.artist_name}</h1>
            <img src={artistData.artist_image} alt={`Profile picture of ${artistData.artist_name}`}/>
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
    )
}

function Artist(props) {
    let artistID = props.id;
    return (
        <>{artistID ? <ArtistProfile id={artistID} /> : <Redirect to="/"></Redirect>}</>
    )
}

export default Artist;