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



export default function SpotArtist(props) {
    const [input, setInput] = useState("");
    const [cards, setCards] = useState([])

    const handleInput = (ev) => {
        setInput(ev.target.value)
    }

    function fetchByArtist() {
        return new Promise((resolve, reject) => {
            input.replaceAll(" ", "%20")
            fetch(address + '/apiSearch?q=' + input + '&type=artist')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let artist_array = data.items.map(artist => {
                        let url = artist.images.length > 0 ? artist.images[0].url : defaultSpotifyImgLink
                        return <div onClick={() => {props.showDialog(false)}}><SongCard type="artist" style={{ 'min-height': '100px' }} id={artist.id} 
                        trackArtist={artist.artist_name} imageURL={url}></SongCard></div>
                    })
                    setCards(artist_array.splice(0, 6));
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
                fetchByArtist()
                .then(() => {
                    props.setConfirmation(true);
                })
                .catch(err => {
                    props.setAlert("Something went wrong with your request. Please try again later.")
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
                    <DialogTitle id="stat-dialog">Artist</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            {cards.length > 1 ? "I found a couple. Let me know which one you meant." : "Can you specify what you meant?"}
                        </DialogContentText>
                        <CardHolder cards={cards}/>
                    </DialogContent>
                </> :
                <>
                    <DialogTitle id="stat-dialog">Artist</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            Who's your favorite artist?
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="artist"
                            label="Artist"
                            fullWidth
                            onKeyPress={handleEnterPressed}
                            onChange={handleInput} />
                    </DialogContent>
                </>}
        </>
    )
}