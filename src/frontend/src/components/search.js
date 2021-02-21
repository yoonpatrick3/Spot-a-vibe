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
        console.log("Input: " + input + " Option: " + option);
        //api call here i think
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
                    <SearchGroup handleSearch={search}></SearchGroup>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 100}}>
                    <ContinuousSlider weightName="Weight1" handleWeightChange={handleWeightChange}></ContinuousSlider>
                    <ContinuousSlider weightName="Weight2" handleWeightChange={handleWeightChange}></ContinuousSlider>
                    <ContinuousSlider weightName="Weight3" handleWeightChange={handleWeightChange}></ContinuousSlider>
                </Grid>
                <SongCard trackArtist="KD/A" trackName="POP/STARS" 
                    imageURL="https://i.scdn.co/image/ab67616d0000b2731b36f91abf80aedb7c88f460"></SongCard>
            </Grid>
        </div>
    )
}

export default Search;