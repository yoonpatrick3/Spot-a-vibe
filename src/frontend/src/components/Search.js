import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ContinuousSlider from './MySlider';
import SearchGroup from './SearchGroup';
import SongCard from './Card';
import { makeStyles } from '@material-ui/core';
import { address } from '../App'
import { defaultSpotifyImgLink } from './Artist'
import StatTooltip from './StatTooltip'
import StatDialog from './StatDialog'

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
        Danceability: 0.6,
        Valence: 0.5,
        Acousticness: 0.2,
        Energy: 0.6,
        Instrumentalness: 0.03
    });
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    function search(input, option) {
        input.replaceAll(" ", "%20")
        fetch(address + '/apiSearch?q=' + input + '&type=' + option)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (option === "artist") {
                    let artist_array = data.items.map(artist => {
                        let url = artist.images.length > 0 ? artist.images[0].url : defaultSpotifyImgLink
                        return <SongCard type="artist" style={{ 'min-height': '100px' }} id={artist.id} trackArtist={artist.artist_name} imageURL={url}></SongCard>
                    })
                    props.updateFunc(artist_array);
                } else {
                    let track_array = data.items.map(track => {
                        let url = track.images.length > 0 ? track.images[0].url : defaultSpotifyImgLink;

                        return <SongCard style={{ 'min-height': '100px' }} id={track.id} trackArtist={track.artist_name}
                            trackName={track.track_name} imageURL={url} type="track"></SongCard>
                    })
                    props.updateFunc(track_array);
                }
                props.setShowing(move_left_style);
            })
            .catch(err => {
                props.setAlert("Something went wrong with your request. Please try again later.")
                console.log(err)
            })
    }

    function searchByWeights() {
        fetch(`${address}/apiWeights?d=${weights.Danceability}&v=${weights.Valence}&a=${weights.Acousticness}&e=${weights.Energy}&i=${weights.Instrumentalness}`)
            .then(response => {
                return response.json();
            }).then(data => {
                let track_array = data.similar_songs.map(track => {
                    let url = track.img_link ? track.img_link : defaultSpotifyImgLink;

                    return <SongCard style={{ 'min-height': '100px' }} id={track.id} trackArtist={track.artist_name}
                        trackName={track.title} imageURL={url} type="track"></SongCard>
                })
                props.updateFunc(track_array);
            }).catch(err => {
                props.setAlert("Something went wrong with your request. Please try again later.")
                console.log(err)
            })

        props.setShowing(move_left_style);
    }

    return (
        <div className="search">
            <div>
                <h2>Search by Artist or Track</h2>
                <SearchGroup className="search" handleSearch={search}></SearchGroup>
            </div>

            <div>
                <h2>Search by vibes <StatTooltip setOpen={setOpen} /> </h2> 
                <ContinuousSlider weightName="Danceability" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Danceability}></ContinuousSlider>
                <ContinuousSlider weightName="Valence" setWeight={setWeight} min={0.0} max={1.0} defaultValue={weights.Valence}></ContinuousSlider>
                <ContinuousSlider weightName="Acousticness" setWeight={setWeight} max={0.4} min={0.0} defaultValue={weights.Acousticness}></ContinuousSlider>
                <ContinuousSlider weightName="Energy" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Energy}></ContinuousSlider>
                <ContinuousSlider weightName="Instrumentalness" setWeight={setWeight} min={0.0} max={.06} defaultValue={weights.Instrumentalness}></ContinuousSlider>
                <Button variant="outlined" onClick={searchByWeights} className={classes.button}>Search</Button>
                <StatDialog isTrack={props.isTrack} open={open} onClose={() => setOpen(false)} />
            </div>
        </div>
    )
}

export default Search;