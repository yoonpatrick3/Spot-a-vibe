import React, { useState } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import StatDialog from './StatDialog'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    relative: {
        position: 'relative',
        left: theme.spacing(1),
    },
}));

export function formatStat(stat) {
    if (stat <= .20) {
        return "Very low";
    } else if (stat <= .40) {
        return "Moderately low";
    } else if (stat <= .60) {
        return "Neutral"
    } else if (stat <= .80) {
        return "Moderately high";
    } else {
        return "Very high"
    }
}

export default function Stat(props) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return (
        <div className="music-stats">
            <h2>Music Analysis:
                <Tooltip title="Click for more information" aria-label="info" className={classes.relative}>
                    <Button onClick={() => setOpen(true)}>
                        <HelpIcon color="disabled" />
                    </Button>
                </Tooltip>
            </h2>
            <p>Danceability: {props.danceability}</p>
            <p>Valence: {props.valence}</p>
            <p>Acousticness: {props.acousticness}</p>
            <p>Energy: {props.energy}</p>
            <p>Instrumentalness: {props.instrumentalness}</p>
            <StatDialog isTrack={props.isTrack} open={open} onClose={() => setOpen(false)} />
        </div>
    )
}