import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Initial(props) {
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
                        <Button onClick={() => { props.setPhase('learn more') }} color="disabled">
                            Learn more
                        </Button>
                        <Button onClick={() => { props.setPhase('question') }} color="primary">
                            Get Started
                        </Button>
                    </DialogActions>
                </>
    )
}