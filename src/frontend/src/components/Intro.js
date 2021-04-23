import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    medium: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
}));

export default function Intro(props) {
    const classes = useStyles();

    return (
        <div>
            <Avatar src={props.imgSrc} alt={`Profile picture of ${props.alt}`} className={classes.large} />
            <h1>{props.name}</h1>
        </div>
    )
}