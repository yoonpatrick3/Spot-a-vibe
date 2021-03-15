import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ContinuousSlider from './MySlider';
import SearchGroup from './SearchGroup';
import SongCard from './card';

const Search = (props) => {
    const [weights, setWeight] = useState({
        Weight1: 0,
        Weight2: 0,
        Weight3: 0
    });

    function search(input, option) {
        //api call here i think
        input.replaceAll(" ", "%20")
        fetch('http://localhost:5000/apiSearch?q=' + input + '&type=' + option)
            .then(response=> {
                return response.json();
            })
            .then(data => {
                if (option === "artist") {
                    let song_array = data.items.map(artist => {
                        console.log(artist);
                        console.log(artist.name);
                        console.log(artist.id);
                        let url = artist.images.length > 0 ? artist.images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
                        return <SongCard trackArtist={artist.name} trackName={artist.id} imageURL={url}></SongCard>
                    })
                    props.updateFunc(song_array)
                } else {

                }
            })
    }

    useEffect(() => {
        console.log(weights);
    })

    const handleWeightChange = (weightName, newVal) => {
        setWeight((prev) => ({
            ...prev,
            [weightName]: newVal
        }))
    }

    return (
        <div className="search">
            <Grid container >
                <Grid item xs={12}>
                    <SearchGroup className="search" handleSearch={search}></SearchGroup>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 100}}>
                    <ContinuousSlider weightName="Weight1" handleWeightChange={handleWeightChange}></ContinuousSlider>
                    <ContinuousSlider weightName="Weight2" handleWeightChange={handleWeightChange}></ContinuousSlider>
                    <ContinuousSlider weightName="Weight3" handleWeightChange={handleWeightChange}></ContinuousSlider>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default Search;