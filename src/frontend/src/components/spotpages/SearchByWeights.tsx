import { useState } from 'react'
import ContinuousSlider from '../MySlider'
import { SongWeight } from '../MySlider'
import CardHolder from '../CardHolder'
import { SongCardType } from '../Card'
import { address } from '../../App'
import { defaultSpotifyImgLink } from '../Artist'
import SongCard from '../Card'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export interface ErrorHandlingProps {
    setAlert: any,
    showSpotDialog: any
}

enum WeightQuestionPhase {
    Initial = "initial",
    Danceability = "d",
    Valence = "v",
    Energy = "e",
    Instrumentalness = "i",
    Acousticness = "a",
    Results = "r"
}

export default function SearchByWeights({ setAlert, showSpotDialog }: ErrorHandlingProps): JSX.Element {
    const [cards, setCards] = useState<JSX.Element[]>([])
    const [weightPhase, setWeightPhase] = useState(WeightQuestionPhase.Initial)
    const [weights, setWeight] = useState<SongWeight>({
        Danceability: 0.6,
        Valence: 0.5,
        Acousticness: 0.2,
        Energy: 0.6,
        Instrumentalness: 0.03
    });

    function weightedSearch() {
        fetch(`${address}/apiWeights?d=${weights.Danceability}&v=${weights.Valence}&a=${weights.Acousticness}&e=${weights.Energy}&i=${weights.Instrumentalness}`)
            .then(response => {
                return response.json();
            }).then(data => {
                let track_array = data.similar_songs.map((track: { img_link: string, title: string, artist_name: string, id: string }) => {
                    let url = track.img_link ? track.img_link : defaultSpotifyImgLink;

                    return <div onClick={() => {showSpotDialog(false)}}><SongCard id={track.id} trackArtist={track.artist_name}
                        trackName={track.title} imageURL={url} type={SongCardType.Track}></SongCard></div>
                })
                setCards(track_array);
                setWeightPhase(WeightQuestionPhase.Results)
            }).catch(err => {
                setAlert({ show: true, message: "Something went wrong with your request. Please confirm you are using https." })
                console.log(err)
            })

    }


    function renderByWeightPhase() {
        switch (weightPhase) {
            case WeightQuestionPhase.Initial:
                return (
                    <>
                        <DialogTitle id="stat-dialog">It's okay, just let me know know your vibe :)</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                I'll ask you some questions and we'll give a recommendation based off your answers.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Danceability) }} color="primary">
                                Get Started
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Danceability:
                return (
                    <>
                        <DialogTitle id="stat-dialog">Danceability</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                How important is it that the song is danceable?
                                <ContinuousSlider weightName="Danceability" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Danceability}></ContinuousSlider>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Initial) }}>
                                Back
                            </Button>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Valence) }} color="primary">
                                Next
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Valence:
                return (
                    <>
                        <DialogTitle id="spot-dialog">Valence</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                Are you looking for a positive/happy song (high) or a sad/angry song (low)?
                                <ContinuousSlider weightName="Valence" setWeight={setWeight} min={0.0} max={1.0} defaultValue={weights.Valence}></ContinuousSlider>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Danceability) }}>
                                Back
                            </Button>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Energy) }} color="primary">
                                Next
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Energy:
                return (
                    <>
                        <DialogTitle id="spot-dialog">Energy</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                Do you like a very energetic music or very mellow and laid back?
                                <ContinuousSlider weightName="Energy" setWeight={setWeight} min={0.2} max={1.0} defaultValue={weights.Energy}></ContinuousSlider>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Valence) }}>
                                Back
                            </Button>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Instrumentalness) }} color="primary">
                                Next
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Instrumentalness:
                return (
                    <>
                        <DialogTitle id="spot-dialog">Instrumentalness</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                Do you like more instrumental music, or in other words, do you like music with fewer words?
                                <ContinuousSlider weightName="Instrumentalness" setWeight={setWeight} min={0.0} max={.06} defaultValue={weights.Instrumentalness}></ContinuousSlider>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Energy) }}>
                                Back
                            </Button>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Acousticness) }} color="primary">
                                Next
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Acousticness:
                return (
                    <>
                        <DialogTitle id="spot-dialog">Acousticness</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                How important do you value acoustic music ie. non eletric music?
                                <ContinuousSlider weightName="Acousticness" setWeight={setWeight} max={0.4} min={0.0} defaultValue={weights.Acousticness}></ContinuousSlider>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setWeightPhase(WeightQuestionPhase.Instrumentalness) }}>
                                Back
                            </Button>
                            <Button onClick={weightedSearch} color="primary">
                                Finish!
                            </Button>
                        </DialogActions>
                    </>
                );
            case WeightQuestionPhase.Results:
                return (
                    <>
                        <DialogTitle id="spot-dialog">Artist</DialogTitle>
                        <Divider></Divider>
                        <DialogContent>
                            <DialogContentText>
                                {cards.length > 0 ? "Here's what I think you'd like." : "Something broke :( Please try again."}
                            </DialogContentText>
                            <CardHolder cards={cards} />
                        </DialogContent>
                    </>
                );
        }
    }


    return (
        <>
            {renderByWeightPhase()}
        </>
    )
}