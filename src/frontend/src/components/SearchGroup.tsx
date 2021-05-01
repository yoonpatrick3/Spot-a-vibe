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

interface SearchGroupProps {
    search: any
}

export const SearchGroup = ({search}: SearchGroupProps) => {

    const [currOpt, setOpt] = useState("artist");
    const [input, setInput] = useState("");

    const classes = useStyles();

    const handleOptionChange = (ev: any):void => {
        setOpt(ev.target.value);
    }

    const handleSearch = (ev:any):void => {
        if(input !== ""){
            search(input, currOpt);
        }
    }

    const handleEnterPressed = (ev:any):void => {
        if (ev.key == 'Enter') {
            search(input, currOpt)
        }
    }

    return (
        <>
            <div className="search-group">
                <TextField label={currOpt} onChange={(ev) => {
                    setInput(ev.target.value);
                }} onKeyPress={handleEnterPressed} className="search-input"></TextField>
                <Select labelId="label" defaultValue="artist" onChange={handleOptionChange} className="search-dropdown">
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="track">Track</MenuItem>
                </Select>
            </div>
            <Button variant="outlined" onClick={handleSearch} className={classes.button}>Search</Button>
        </>
    )
}

export default SearchGroup;