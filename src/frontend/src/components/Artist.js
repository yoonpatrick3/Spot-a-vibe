import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import CardHolder from './CardHolder'
import SongCard from './Card'
import Tooltip from '@material-ui/core/Tooltip';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PeopleIcon from '@material-ui/icons/People';
import AlbumIcon from '@material-ui/icons/Album';
import { address } from '../App'
import CircularProgress from '@material-ui/core/CircularProgress';
import Intro from './Intro'
import Stat, { formatStat } from './Stat'
import Divider from '@material-ui/core/Divider';


const defaultSpotifyImgLink = 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png';


function formatList(list) {
    let trimmedList = list.slice(0, 3);
    let returnStr = trimmedList.toString();
    returnStr = returnStr.replaceAll(",", " | ")
    return returnStr;
}


function ArtistProfile(props) {
    const [artistData, setArtistData] = useState({})

    useEffect(() => {
        fetch(`${address}/api/artist?artist_id=${props.id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let danceability = 0;
                let valence = 0;
                let acousticness = 0;
                let energy = 0;
                let instrumentalness = 0;
                let popularity = data.popularity;
                let genres = formatList(data.genres);

                data.discography.forEach(song => {
                    danceability += song.danceability;
                    valence += song.valence;
                    acousticness += song.acousticness;
                    energy += song.energy;
                    instrumentalness += song.instrumentalness;
                })

                danceability /= data.discography.length;
                valence /= data.discography.length;
                acousticness /= data.discography.length;
                energy /= data.discography.length;
                instrumentalness /= data.discography.length;

                danceability = formatStat(danceability);
                valence = formatStat(valence);
                acousticness = formatStat(acousticness);
                energy = formatStat(energy);
                instrumentalness = formatStat(instrumentalness);


                let discography = data.discography.map(song => {
                    return <SongCard style={{ 'min-height': '100px' }} id={song.id} trackArtist={data.artist_name}
                        trackName={song.title} imageURL={song.img_link} type="track"></SongCard>
                })

                setArtistData({
                    artist_name: data.artist_name,
                    artist_image: data.images.length > 0 ? data.images[0].url : defaultSpotifyImgLink,
                    danceability: danceability,
                    valence: valence,
                    acousticness: acousticness,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    discography: discography,
                    popularity: popularity,
                    followers: data["follower-count"],
                    genres: genres,
                    discography: discography
                })
            })
    }, [props.id])


    return (
        <div className="artist-track-profile">
            {artistData.artist_name ?
                <>
                    <div className="artist-track-bio">
                        <Intro imgSrc={artistData.artist_image} alt={`Profile picture of ${artistData.artist_name}`} name={artistData.artist_name}></Intro>
                        <div className="artist-data">
                            <Tooltip title="Followers on Spotify" aria-label="followers">
                                <h3><PeopleIcon color="disabled" /> {artistData.followers}</h3>
                            </Tooltip>
                            <Tooltip title="Popularity of artist (on a scale of 0-100)" aria-label="popularity">
                                <h3><WhatshotIcon color="secondary" /> {artistData.popularity}</h3>
                            </Tooltip>
                            {artistData.genres.length > 0 ? <Tooltip title="Genre of music" aria-label="genre">
                                <h3><AlbumIcon color="disabled" /> {artistData.genres}</h3>
                            </Tooltip> : <></>}
                        </div>
                        <Stat danceability={artistData.danceability} valence={artistData.valence} acousticness={artistData.acousticness}
                        energy={artistData.energy} instrumentalness={artistData.instrumentalness} isTrack={false}></Stat>
                    </div>
                    <Divider />
                    <div className="results-page">
                        <CardHolder cards={artistData.discography} />
                    </div>
                </> : <CircularProgress />}
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