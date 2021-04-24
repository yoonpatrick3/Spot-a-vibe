import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ContinuousSlider from './MySlider';
import SearchGroup from './SearchGroup';
import SongCard from './Card';
import { makeStyles } from '@material-ui/core';
import { address } from '../App'

const useStyles = makeStyles({

    button: {
        marginTop: "10px",
    }
});

export let move_left_style = {
    transform: `translate(-100vw, 0px)`,
    'transition-duration': '1s',
}

const Search = (props) => {
    const [weights, setWeight] = useState({
        Danceability: 0.5, 
        Valence: 0.5,
        Acousticness: 0.5,
        Energy:0.5, 
        Instrumentalness:0.5
    });

    const classes = useStyles();

    function search(input, option) {
        input.replaceAll(" ", "%20")
        fetch(address + '/apiSearch?q=' + input + '&type=' + option)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (option === "artist") {
                    let song_array = data.items.map(artist => {
                        let url = artist.images.length > 0 ? artist.images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
                        return <SongCard type="artist" style = {{'min-height': '100px'}} id={artist.id} trackArtist={artist.artist_name} imageURL={url}></SongCard>
                    })
                    props.updateFunc(song_array);
                } else {
                    let track_array = data.items.map(track => {
                        let url = track.images.length > 0 ? track.images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png';

                        return <SongCard style = {{'min-height': '100px'}} id={track.id} trackArtist={track.artist_name}
                         trackName = {track.track_name} imageURL={url} type="track"></SongCard>
                    })
                    props.updateFunc(track_array);
                }
                props.setShowing(move_left_style);
            })
    }

    function searchByWeights() {
        console.log("d:" + weights.Danceability + "v:" + weights.Valence + "a:" + weights.Acousticness + "e" + weights.Energy + "i" + weights.Instrumentalness)
        props.setShowing(move_left_style);
    }

    return (
        <div className="search">
            <div>
                <h2>Search by Artist or Track</h2>
                <SearchGroup className="search" handleSearch={search}></SearchGroup>
            </div>

            <div>
                <h2>Search by vibes </h2>
                <ContinuousSlider weightName="Danceability" setWeight={setWeight}></ContinuousSlider>
                <ContinuousSlider weightName="Valence" setWeight={setWeight}></ContinuousSlider>
                <ContinuousSlider weightName="Acousticness" setWeight={setWeight}></ContinuousSlider>
                <ContinuousSlider weightName="Energy" setWeight={setWeight}></ContinuousSlider>
                <ContinuousSlider weightName="Instrumentalness" setWeight={setWeight}></ContinuousSlider>
                <Button variant="outlined" onClick={searchByWeights} className={classes.button}>Search</Button>
            </div>
        </div>
    )
}

export default Search;