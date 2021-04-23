import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import CardHolder from './CardHolder'
import SongCard from './Card'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import StatDialog from './StatDialog'
import Button from '@material-ui/core/Button';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PeopleIcon from '@material-ui/icons/People';
import AlbumIcon from '@material-ui/icons/Album';

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
    relative: {
        position: 'relative',
        left: theme.spacing(1),
    },
}));

function formatStat(stat) {
    if (stat <= .20) {
        return "Very low";
    } else if (stat <= .40) {
        return "Moderately low";
    } else if (stat <= .60) {
        return "Neutral"
    } else if (stat <= .80) {
        return "Moderately high";
    } else {
        return "Very high"
    }
}

function formatList(list) {
    let returnStr = list.toString();
    returnStr = returnStr.replaceAll(",", " | ")
    return returnStr;
}


function ArtistProfile(props) {
    const [artistData, setArtistData] = useState({})
    const classes = useStyles();
    const [open, setOpen] = useState(false);

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
                let loudness = 0;
                let speechiness = 0;
                let popularity = data.popularity;
                let genres = formatList(data.genres);

                data.discography.forEach(song => {
                    danceability += song.danceability;
                    positivity += song.valence;
                    acousticness += song.acousticness;
                    energy += song.energy;
                    instrumentalness += song.instrumentalness;
                    loudness += song.loudness;
                    speechiness += song.speechiness;
                })

                danceability /= data.discography.length;
                positivity /= data.discography.length;
                acousticness /= data.discography.length;
                energy /= data.discography.length;
                instrumentalness /= data.discography.length;
                loudness /= data.discography.length;
                speechiness /= data.discography.length;

                danceability = formatStat(danceability);
                positivity = formatStat(positivity);
                acousticness = formatStat(acousticness);
                energy = formatStat(energy);
                instrumentalness = formatStat(instrumentalness);
                loudness = formatStat(loudness);
                speechiness = formatStat(speechiness);


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
                    loudness: loudness,
                    speechiness: speechiness,
                    discography: discography,
                    popularity: popularity,
                    followers: data["follower-count"],
                    genres: genres,
                    discography: discography
                })
            })
    }, [props.id])


    return (
        <div className="artist-profile">
            {artistData.artist_name ?
                <>
                    <div className="artist-bio">
                        <div className="artist-intro">
                            <Avatar src={artistData.artist_image} alt={`Profile picture of ${artistData.artist_name}`} className={classes.large} />
                            <h1>{artistData.artist_name}</h1>
                        </div>
                        <div className="artist-data">
                            <h3><PeopleIcon color="disabled"/> {artistData.followers}</h3>
                            <h3><WhatshotIcon color="secondary"/> {artistData.popularity}</h3>
                            <h3><AlbumIcon color="disabled"/> {artistData.genres}</h3>
                        </div>
                        <div className="artist-music-stats">
                            <h2>Music Analysis:
                                <Tooltip title="Click for more information" aria-label="info" className={classes.relative}>
                                    <Button onClick={() => setOpen(true)}>
                                        <HelpIcon color="disabled" />
                                    </Button>
                                </Tooltip>
                            </h2>
                            <p>Danceability: {artistData.danceability}</p>
                            <p>Positivity: {artistData.positivity}</p>
                            <p>Acousticness: {artistData.acousticness}</p>
                            <p>Energy: {artistData.energy}</p>
                            <p>Instrumentalness: {artistData.instrumentalness}</p>
                            <p>Loudness: {artistData.loudness}</p>
                            <p>Speechiness: {artistData.speechiness}</p>
                            <StatDialog open={open} onClose={() => setOpen(false)} />
                        </div>
                    </div>
                    <div className="results-page">
                        <CardHolder cards={artistData.discography} />
                    </div>
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