import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';


export default function Spot(props) {
    const [spotPhase, changePhase] = useState("initial");
    const [confirmationQuestion, setConfirmation] = useState(false);

    return (
        <Dialog onClose={() => { props.handleClose(false) }} aria-labelledby="stat-dialog" open={props.open}>
            {renderSpot(spotPhase, changePhase, confirmationQuestion, setConfirmation, props)}
        </Dialog>
    )
}


function renderSpot(phase, setPhase, confirmationQuestion, setConfrimation, props) {
    switch (phase) {
        case 'initial':
            return (
                <>
                    <DialogTitle id="stat-dialog">Hi I'm Spot!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            I'm a music recommendation website that will get better as more people use me. I break down songs and give my best guess to what you like.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setPhase('learn more') }} color="disabled">
                            Learn more
                        </Button>
                        <Button onClick={() => { setPhase('question') }} color="primary">
                            Get Started
                        </Button>
                    </DialogActions>
                </>
            )
        case 'learn more':
            return (
                <>
                    <DialogTitle id="stat-dialog">Meet my parents!</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            This project was made at HackBeanpot 2021. This project's brains was created by Patrick Yoon. His algorithm is what drives our
                            recommendations and our app. The front-end and back-end were created by Cheng Xi Tsou, Saahil Kumar, and David Yan. We utilize
                            the Spotify API to get details about songs and artists.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setPhase('question') }} color="primary">
                            Get Started
                        </Button>
                    </DialogActions>
                </>
            )
        case 'question':
            return (
                <>
                    <DialogTitle id="stat-dialog">Tell me about yourself</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>
                        <DialogContentText>
                            Do you have a favorite artist or track?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setPhase('search by weights') }} color="disabled">
                            I don't know
                        </Button>
                        <Button onClick={() => { setPhase('search by artist') }} color="primary">
                            Artist
                        </Button>
                        <Button onClick={() => { setPhase('search by track') }} color="primary">
                            Track
                        </Button>
                    </DialogActions>
                </>
            )
        case 'search by track':

            return (
                <>
                    {confirmationQuestion ?
                        <>
                            <DialogTitle id="stat-dialog">Track</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    What's your favorite track?
                                </DialogContentText>
                            </DialogContent>
                        </> :
                        <>
                            <DialogTitle id="stat-dialog">Track</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    Is this what you meant?
                                </DialogContentText>
                            </DialogContent>
                        </>}
                </>
            )
        case 'search by artist':
            return (
                <>
                    {confirmationQuestion ?
                        <>
                            <DialogTitle id="stat-dialog">Track</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    What's your favorite artist?
                                </DialogContentText>
                            </DialogContent>
                        </> :
                        <>
                            <DialogTitle id="stat-dialog">Track</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    Is this what you meant?
                                </DialogContentText>
                            </DialogContent>
                        </>}
                </>
            )
        case 'search by weights':
            return;
    }
}