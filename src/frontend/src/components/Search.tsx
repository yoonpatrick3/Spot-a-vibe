import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ContinuousSlider from './MySlider';
import SearchGroup from './SearchGroup';
import SongCard from './Card';
import { makeStyles } from '@material-ui/core';
import { address } from '../App'
import { defaultSpotifyImgLink } from './Artist'
import StatTooltip from './StatTooltip'
import StatDialog from './StatDialog'
import { SongWeight } from './MySlider'
import { SongCardType } from './Card'

export interface ArtistJSON {
    id: string,
    artist_name: string,
    images: { url: string }[]
}

export interface TrackJSON {
    id: string,
    artist_name: string,
    track_name: string,
    images: { url: string }[]
}



const useStyles = makeStyles({

    button: {
        marginTop: "10px",
    }
});

export let move_left_style = {
    transform: `translate(-100vw, 0px)`,
    'transition-duration': '1s',
}

const Search = ({updateFunc, setShowing, setAlert, isTrack}: {updateFunc: any, setShowing:any, setAlert:any, isTrack:boolean}) => {
    const [weights, setWeight] = useState<SongWeight>({
        Danceability: 0.6,
        Valence: 0.5,
        Acousticness: 0.2,
        Energy: 0.6,
        Instrumentalness: 0.03
    });
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    function search(input: string, option: string) {
        input.replaceAll(" ", "%20")
        fetch(address + '/apiSearch?q=' + input + '&type=' + option)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (option === "artist") {
                    let artist_array = data.items.map((artist: ArtistJSON) => {
                        let url = artist.images.length > 0 ? artist.images[0].url : defaultSpotifyImgLink
                        return <SongCard type={SongCardType.Artist} id={artist.id} trackArtist={artist.artist_name} imageURL={url}
                        trackName=""></SongCard>
                    })
                    updateFunc(artist_array);
                } else {
                    let track_array = data.items.map((track: TrackJSON) => {
                        let url = track.images.length > 0 ? track.images[0].url : defaultSpotifyImgLink;

                        return <SongCard id={track.id} trackArtist={track.artist_name}
                            trackName={track.track_name} imageURL={url} type={SongCardType.Track}></SongCard>
                    })
                    updateFunc(track_array);
                }
                setShowing(move_left_style);
            })
            .catch(err => {
                setAlert({ show: true, message: "Something went wrong with your request. Please confirm you are using https." })
                console.log(err)
            })
    }

    function searchByWeights() {
        fetch(`${address}/apiWeights?d=${weights.Danceability}&v=${weights.Valence}&a=${weights.Acousticness}&e=${weights.Energy}&i=${weights.Instrumentalness}`)
            .then(response => {
                return response.json();
            }).then(data => {
                let track_array = data.similar_songs.map((track: {img_link: string, title: string, artist_name: string, id: string}) => {
                    let url = track.img_link ? track.img_link : defaultSpotifyImgLink;

                    return <SongCard id={track.id} trackArtist={track.artist_name}
                        trackName={track.title} imageURL={url} type={SongCardType.Track}></SongCard>
                })
                updateFunc(track_array);
            }).catch(err => {
                setAlert({ show: true, message: "Something went wrong with your request. Please confirm you are using https." })
                console.log(err)
            })

        setShowing(move_left_style);
    }

    return (
        <div className="search">
            <div>
                <h2>Search by Artist or Track</h2>
                <SearchGroup search={search}></SearchGroup>
            </div>

            <div>
                <h2>Search by vibes <StatTooltip setOpen={setOpen} /> </h2>
                <ContinuousSlider weightName="Danceability" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Danceability}></ContinuousSlider>
                <ContinuousSlider weightName="Valence" setWeight={setWeight} min={0.0} max={1.0} defaultValue={weights.Valence}></ContinuousSlider>
                <ContinuousSlider weightName="Acousticness" setWeight={setWeight} max={0.4} min={0.0} defaultValue={weights.Acousticness}></ContinuousSlider>
                <ContinuousSlider weightName="Energy" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Energy}></ContinuousSlider>
                <ContinuousSlider weightName="Instrumentalness" setWeight={setWeight} min={0.0} max={.06} defaultValue={weights.Instrumentalness}></ContinuousSlider>
                <Button variant="outlined" onClick={searchByWeights} className={classes.button}>Search</Button>
                <StatDialog isTrack={isTrack} open={open} onClose={() => setOpen(false)} />
            </div>
        </div>
    )
}

export default Search;