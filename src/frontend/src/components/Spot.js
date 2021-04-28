import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './Intro';
import Cheng from '../resources/cheng.jpg';
import David from '../resources/smol_me.jpg';
import Patrick from '../resources/patrick_yoon.jpg';
import Saahil from '../resources/saahil.jpg';


export default function Spot(props) {
    const [confirmationQuestion, setConfirmation] = useState(false);
    const classes = useStyles();

    return (
        <Dialog onClose={() => { props.handleClose(false) }} aria-labelledby="stat-dialog" open={props.open}
            maxWidth={'xl'}>
            {renderSpot(props.spotPhase, props.changePhase, confirmationQuestion, setConfirmation, classes.icon)}
        </Dialog>
    )
}


function renderSpot(phase, setPhase, confirmationQuestion, setConfirmation, style) {
    switch (phase) {
        case 'initial':
            return (
                <>
                    <DialogTitle id="stat-dialog">Hi I'm Spot!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            I'm a music recommendation website that will get better as more people use me. I break down songs and give my best guess at a
                            recommendation based on what you like.
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
                    <Divider variant="middle" />
                    <DialogContent>
                        <DialogContentText className="spot-learn-more">
                            <p>This project was made at HackBeanpot 2021 using the Spotify API. It is a flask and MySQL backend that serves a
                            React SPA. It is served using Gunicorn and the Heroku platform.</p>
                            <div>
                                <Divider />
                            </div>
                            <div className="spot-bios" id="patrick">
                                <Avatar src={Patrick} alt="Patrick Yoon" className={style} />
                                <p>This project's brains was created by Patrick Yoon. His algorithm is what drives our
                                recommendations and our app. </p>
                            </div>
                            <div className="spot-bios" id="david">
                                <Avatar src={David} alt="David Yan" className={style} />
                                <p>Hi, I'm David. I have a huge passion for full stack and maybe invested a bit too much time into this project.
                                   Loved working on the api routes, UI/UX, and connecting it all together.</p>
                            </div>
                            <div className="spot-bios" id="saahil">
                                <Avatar src={Saahil} alt="Saahil Kumar" className={style} />
                                <p>Saahil designed our database representation and oversaw its initialization. Saahil was indispensable in the routes, API calls, and team erergy. :)</p>
                            </div>
                            <div className="spot-bios" id="cheng">
                                <Avatar src={Cheng} alt="Cheng Xi Tsou" className={style} />
                                <p>Cheng built the search form UI at the center of our application! He also contributed massively to the project ideation with
                                    the idea to search by weights.</p>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setPhase('explanation') }} color="disabled">
                            Learn More
                        </Button>
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

                            </DialogContent>
                        </> :
                        <>
                            <DialogTitle id="stat-dialog">Track</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    What's your favorite track?
                                </DialogContentText>
                                <TextField>

                                </TextField>
                            </DialogContent>
                        </>}
                </>
            )
        case 'search by artist':
            return (
                <>
                    {confirmationQuestion ?
                        <>
                            <DialogTitle id="stat-dialog">Artist</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>

                            </DialogContent>
                        </> :
                        <>
                            <DialogTitle id="stat-dialog">Artist</DialogTitle>
                            <Divider></Divider>
                            <DialogContent>
                                <DialogContentText>
                                    What's your favorite artist?
                                </DialogContentText>
                                <TextField>

                                </TextField>
                            </DialogContent>
                        </>}
                </>
            )
        case 'search by weights':
            return;
        case 'explanation':
            return;
    }
}