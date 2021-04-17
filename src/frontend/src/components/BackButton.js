import React from 'react';
import Button from '@material-ui/core/Button';

export default function BackButton(props) {

    let move_right_style = {
        transform: `translate(0vw, 0px)`,
        'transition-duration': '1s',
    }

    return (
        <Button variant="contained" color="primary" onClick = {() => props.setShowing(move_right_style)}>
            Back
        </Button>
    );
}