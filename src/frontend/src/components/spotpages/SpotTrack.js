import React, { useState, useEffect } from 'react'
import CardHolder from '../CardHolder'
import SongCard from '../Card'
import { address } from '../../App'
import { defaultSpotifyImgLink } from '../Artist'
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

export default function SpotTrack(props) {
    const [input, setInput] = useState("");
    const [cards, setCards] = useState([])

    const handleInput = (ev) => {
        setInput(ev.target.value)
    }

    function fetchByTrack() {
        return new Promise((resolve, reject) => {
            input.replaceAll(" ", "%20")
            fetch(address + '/apiSearch?q=' + input + '&type=track')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let track_array = data.items.map(track => {
                        let url = track.images.length > 0 ? track.images[0].url : defaultSpotifyImgLink;

                        return <div onClick={() => { props.showDialog(false) }}><SongCard id={track.id} trackArtist={track.artist_name}
                            trackName={track.track_name} imageURL={url} type="track"></SongCard></div>
                    })
                    setCards(track_array.slice(0, 6));
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    const handleEnterPressed = (ev) => {
        if (ev.key == 'Enter') {
            if (input !== "") {
                fetchByTrack()
                .then(() => {
                    props.setConfirmation(true);
                })
                .catch(err => {
                    props.setAlert({show:true, message:"Something went wrong with your request. Please try again later."});
                    console.log(err)
                })
            }
        }
    }

    useEffect(() => {
        return () => {
            props.setConfirmation(false)
        }
    }, [])

    return (
        <>
            {props.confirmationQuestion ?
                <>
                    <DialogTitle id="stat-dialog">Track</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            {cards.length > 1 ? "I found a couple. Let me know which one you meant." : "Can you specify what you meant?"}
                        </DialogContentText>
                        <CardHolder cards={cards} />
                    </DialogContent>
                </> :
                <>
                    <DialogTitle id="stat-dialog">Track</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            What's your favorite track?
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="track"
                            label="Track"
                            fullWidth
                            onKeyPress={handleEnterPressed}
                            onChange={handleInput} />
                    </DialogContent>
                </>}
        </>
    )
}