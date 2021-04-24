import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({

    button: {
        marginTop: "10px",
    }
});

export const SearchGroup = (props) => {

    const [currOpt, setOpt] = useState("artist");
    const [input, setInput] = useState("");

    const classes = useStyles();

    const handleOptionChange = (ev) => {
        setOpt(ev.target.value);
    }

    const handleSearch = (ev) => {
        props.handleSearch(input, currOpt);
    }

    const handleEnterPressed = (ev) => {
        if (ev.key == 'Enter') {
            props.handleSearch(input, currOpt)
        }
    }

    return (
        <div>
            <div className = "search-group">
                <TextField label={currOpt} onChange={(ev) => {
                    setInput(ev.target.value);
                }} onKeyPress={handleEnterPressed}></TextField>
                <Select labelId="label" defaultValue="artist" onChange={handleOptionChange}>
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="track">Track</MenuItem>
                </Select>
            </div>
            <Button variant="outlined" onClick={handleSearch} className={classes.button}>Search</Button>
        </div>
    )
}

export default SearchGroup;