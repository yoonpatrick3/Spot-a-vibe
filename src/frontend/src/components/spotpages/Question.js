import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default function Question(props) {
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
                <Button onClick={() => { props.setPhase('search by weights') }} color="disabled">
                    I don't know
                        </Button>
                <Button onClick={() => { props.setPhase('search by artist') }} color="primary">
                    Artist
                        </Button>
                <Button onClick={() => { props.setPhase('search by track') }} color="primary">
                    Track
                        </Button>
            </DialogActions>
        </>
    )
}