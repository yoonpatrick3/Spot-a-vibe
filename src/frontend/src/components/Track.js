import React from 'react';
import { Redirect } from 'react-router-dom'


function TrackProfile(props) {
    return (
        <div>
            {props.id}
        </div>
    )
}

function Track(props) {
    let trackID = props.id;
    return (
        <>
            {trackID ? <TrackProfile id={trackID} /> : <Redirect to="/"></Redirect>}
        </>
    )
}

export default Track;