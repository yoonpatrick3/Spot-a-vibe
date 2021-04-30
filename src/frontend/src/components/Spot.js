import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Initial from './spotpages/Initial'
import Question from './spotpages/Question'
import SpotArtist from './spotpages/SpotArtist'
import SpotTrack from './spotpages/SpotTrack'
import LearnMore from './spotpages/LearnMore'


export default function Spot(props) {
    const [confirmationQuestion, setConfirmation] = useState(false);

    return (
        <Dialog onClose={() => { props.handleClose(false) }} aria-labelledby="stat-dialog" open={props.open}
            maxWidth={'lg'}>
            {renderSpot(props.spotPhase, props.changePhase, confirmationQuestion, setConfirmation, props.setAlert, props.handleClose)}
        </Dialog>
    )
}


function renderSpot(phase, setPhase, confirmationQuestion, setConfirmation, setAlert, showDialog) {
    switch (phase) {
        case 'initial':
            return <Initial setPhase={setPhase}/>
        case 'learn more':
            return <LearnMore setPhase={setPhase}/>
        case 'question':
            return <Question setPhase={setPhase}/>
        case 'search by track':
            return <SpotTrack confirmationQuestion={confirmationQuestion} setConfirmation={setConfirmation} 
            setPhase={setPhase} setAlert={setAlert} showDialog={showDialog}/>
        case 'search by artist':
            return <SpotArtist confirmationQuestion={confirmationQuestion} setConfirmation={setConfirmation} 
            setPhase={setPhase} setAlert={setAlert} showDialog={showDialog}/>
        case 'search by weights':
            return;
        case 'explanation':
            return;
    }
}