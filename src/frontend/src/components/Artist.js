import React from 'react';
import { Redirect } from 'react-router-dom'


function ArtistProfile(props) {
    return (
        <div>
            {props.id}
        </div>
    )
}

function Artist(props) {
    let artistID = props.id;
    return (
        <>{artistID ? <ArtistProfile id={artistID}/> : <Redirect to="/"></Redirect>}</>
    )
}

export default Artist;