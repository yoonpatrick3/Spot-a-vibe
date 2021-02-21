import {useState} from 'react'; 
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        width: 400,
    },

    button: {
        marginTop: "10px",
    }
});

export const SearchGroup = (props) => {

    const [currOpt, setOpt] = useState("Artist");
    const [input, setInput] = useState("");

    const classes = useStyles();

    const handleOptionChange = (ev) => {
        setOpt(ev.target.value);
    }

    const handleSearch = (ev) => {
        props.handleSearch(input, currOpt);
    }

    const handleEnterPressed = (ev) => {
        if(ev.key == 'Enter') {
            props.handleSearch(input, currOpt)
        }
    }

    return (
        <div>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={6}>
                    <TextField label={currOpt} onChange={(ev) => {
                        setInput(ev.target.value);
                        console.log(ev.target.value);
                    }} onKeyPress={handleEnterPressed}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel id="label">Search</InputLabel>
                    <Select labelId="label" defaultValue="Artist" onChange={handleOptionChange}>
                        <MenuItem value="Artist">Artist</MenuItem>
                        <MenuItem value="Song">Song</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" onClick={handleSearch} className={classes.button}>Search</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchGroup;