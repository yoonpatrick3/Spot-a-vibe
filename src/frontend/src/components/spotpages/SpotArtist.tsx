import { useState, useEffect } from 'react'
import CardHolder from '../CardHolder'
import SongCard from '../Card'
import { SongCardType } from '../Card'
import { address } from '../../App'
import { defaultSpotifyImgLink } from '../Artist'
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { ArtistJSON } from '../Search'
import { ErrorHandlingProps } from './SearchByWeights'


export default function SpotArtist({setAlert, showSpotDialog}: ErrorHandlingProps): JSX.Element{
    const [input, setInput] = useState<string>("");
    const [cards, setCards] = useState<JSX.Element[]>([])
    const [confirmationQuestion, setConfirmation] = useState<boolean>(false);

    const handleInput = (ev: any): void=> {
        setInput(ev.target.value)
    }

    function fetchByArtist():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            input.replaceAll(" ", "%20")
            fetch(address + '/apiSearch?q=' + input + '&type=artist')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let artist_array = data.items.map((artist: ArtistJSON) => {
                        let url = artist.images.length > 0 ? artist.images[0].url : defaultSpotifyImgLink
                        return <div onClick={() => {showSpotDialog(false)}}><SongCard type={SongCardType.Artist} id={artist.id} 
                        trackArtist={artist.artist_name} imageURL={url} trackName=""></SongCard></div>
                    })
                    setCards(artist_array.splice(0, 6));
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    const handleEnterPressed = (ev: any):void => {
        if (ev.key === 'Enter') {
            if (input !== "") {
                fetchByArtist()
                .then(() => {
                    setConfirmation(true);
                })
                .catch(err => {
                    setAlert({show:true, message:"Something went wrong with your request. Please confirm you are using https."})
                    console.log(err)
                })
            }
        }
    }

    useEffect(() => {
        return () => {
            setConfirmation(false)
        }
    }, [])
    
    return (
        <>
            {confirmationQuestion ?
                <>
                    <DialogTitle id="spot-dialog">Artist</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            {cards.length > 1 ? "I found a couple. Let me know which one you meant." : "Can you specify what you meant?"}
                        </DialogContentText>
                        <CardHolder cards={cards}/>
                    </DialogContent>
                </> :
                <>
                    <DialogTitle id="spot-dialog">Artist</DialogTitle>
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