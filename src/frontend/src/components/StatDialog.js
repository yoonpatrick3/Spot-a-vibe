import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function StatDialog(props) {
    return (
        <Dialog onClose={props.onClose} aria-labelledby="stat-dialog" open={props.open}>
            <DialogTitle id="stat-dialog">Audio Features</DialogTitle>
            <List>
                <ListItem divider={true}>
                    <ListItemText primary="Every track can be broken down into a set of audio features and this decomposition is what drives our algorithm.
                    The music analysis section of an artist's profile is a representative set of an artist's songs and the average of its audio feature values." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Danceability" secondary="A confidence measure of whether the track is acoustic. 
                    Very high represents high confidence the track is acoustic."/>
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Valence" secondary="A measure to describe the musical positiveness conveyed by a track. 
                    Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Acousticness" secondary="A confidence measure of whether the track is acoustic." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Energy" secondary="Energy is a measure to represent a perceptual measure of intensity and activity. 
                    Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. 
                    Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Instrumentalness" secondary="Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as 
                    instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The higher the instrumentalness value is, the greater 
                    likelihood the track contains no vocal content. Values around moderately high are intended to represent instrumental tracks." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Liveness" secondary="Detects the presence of an audience in the recording. Higher liveness values represent an 
                    increased probability that the track was performed live. A value above Moderately High provides strong likelihood that the track is live." />
                </ListItem>
                <ListItem divider={true}>
                    <ListItemText primary="Speechiness" secondary="Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording 
                    (e.g. talk show, audio book, poetry), the higher the value. Values above Moderately High describe tracks that are probably made entirely of spoken words. 
                    Neutral values describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music.
                     Values below Neutral most likely represent music and other non-speech-like tracks." />
                </ListItem>
            </List>
        </Dialog>
    )
}