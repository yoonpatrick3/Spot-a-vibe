import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ContinuousSlider from './MySlider';
import SearchGroup from './SearchGroup';
import SongCard from './Card';
import { makeStyles } from '@material-ui/core';

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
        Weight1: 0,
        Weight2: 0,
        Weight3: 0
    });

    const classes = useStyles();

    function search(input, option) {
        //api call here i think
        input.replaceAll(" ", "%20")
        fetch('http://localhost:5000/apiSearch?q=' + input + '&type=' + option)
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

    function searchByWeights(weight1, weight2, weight3) {
        props.setShowing(move_left_style);
    }


    const handleWeightChange = (weightName, newVal) => {
        setWeight((prev) => ({
            ...prev,
            [weightName]: newVal
        }))
    }

    return (
        <div className="search">
            <div>
                <h2>Search by Artist or Track</h2>
                <SearchGroup className="search" handleSearch={search}></SearchGroup>
            </div>

            <div>
                <h2>Search by vibes </h2>
                <ContinuousSlider weightName="Weight1" handleWeightChange={handleWeightChange}></ContinuousSlider>
                <ContinuousSlider weightName="Weight2" handleWeightChange={handleWeightChange}></ContinuousSlider>
                <ContinuousSlider weightName="Weight3" handleWeightChange={handleWeightChange}></ContinuousSlider>
                <Button variant="outlined" onClick={searchByWeights} className={classes.button}>Search</Button>
            </div>
        </div>
    )
}

export default Search;