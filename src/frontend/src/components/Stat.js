import React, { useState } from 'react';
import StatDialog from './StatDialog'
import StatTooltip from './StatTooltip'


export function formatStat(average, stat) {
    let range;
    if (average <= .5) {
        range = stat;
    } else {
        range = 1 - stat;
    }

    if (stat <= average - .9 * range ) {
        return "Very low";
    } else if (stat <= average - .25 * range) {
        return "Moderately low";
    } else if (stat <= average + .25 * range) {
        return "Neutral"
    } else if (stat <= average + .9 * range) {
        return "Moderately high";
    } else {
        return "Very high"
    }
}

export default function Stat(props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="music-stats">
            <h2>Music Analysis:
                <StatTooltip setOpen={setOpen} />
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