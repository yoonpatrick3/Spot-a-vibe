import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { address } from '../App'
import CircularProgress from '@material-ui/core/CircularProgress';
import CardHolder from './CardHolder'
import SongCard from './Card'
import Intro from './Intro'
import Stat, { formatStat } from './Stat'
import Divider from '@material-ui/core/Divider';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Tooltip from '@material-ui/core/Tooltip';


function TrackProfile(props) {
    const [trackData, setTrackData] = useState({})

    useEffect(() => {
        fetch(`${address}/api/track?track_id=${props.id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let danceability = formatStat(data.danceability);
                let valence = formatStat(data.valence);
                let acousticness = formatStat(data.acousticness);
                let energy = formatStat(data.energy);
                let instrumentalness = formatStat(data.instrumentalness);

                let similarSongs = data.similar_songs.map(song => {
                    return <SongCard style={{ 'min-height': '100px' }} id={song.id} trackArtist={song.artist_name}
                        trackName={song.title} imageURL={song.img_link} type="track"></SongCard>
                })

                setTrackData({
                    danceability: danceability,
                    valence: valence,
                    acousticness: acousticness,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    artistName: data.artist_name,
                    img_link: data.img_link,
                    trackTitle: data.title,
                    popularity: data.popularity,
                    similarSongs: similarSongs,
                    artistID: data.artist_id
                });
            })
    }, props.id)

    return (
        <div className="artist-track-profile">
            {trackData.artistName ?
                <>
                    <div className="artist-track-bio">
                        <Intro imgSrc={trackData.img_link} alt={`Picture of track: ${trackData.trackTitle}`} name={trackData.trackTitle}></Intro>
                        <div>
                            <Tooltip title="Artist of the track" aria-label="artist-name">
                                <Link to={`/artist?id=${trackData.artistID}`}>
                                    <h2>{trackData.artistName}</h2>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Popularity of track (on a scale of 0-100)" aria-label="popularity">
                                <h3><WhatshotIcon color="secondary" /> {trackData.popularity}</h3>
                            </Tooltip>
                        </div>
                        <Stat danceability={trackData.danceability} valence={trackData.valence} acousticness={trackData.acousticness}
                            energy={trackData.energy} instrumentalness={trackData.instrumentalness} isTrack={true}></Stat>
                    </div>
                    <Divider />
                    <div className="results-page">
                        <h1>What we recommend:</h1>
                        <CardHolder cards={trackData.similarSongs} />
                    </div>
                </> : <CircularProgress />}
        </div>
    )
}

function Track(props) {
    let trackID = props.id;
    return (
        <>
            {trackID ? <TrackProfile id={trackID} /> : <Redirect to="/"></Redirect>}
        </>
    )
}

export default Track;