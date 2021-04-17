import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    "flex-direction": 'column',
    'min-width':'80%',
    'min-height':'80%',
    'background-color': "lightgrey",
    'overflow': 'auto',
  }
}));

export const CardHolder = (props) => {
  const classes = useStyles();
  return (
   <div className={classes.root}>
       {props.cards}
   </div>
  );
}

export default CardHolder

//TODO: get song cards to link to the artist profile
//TODO: search by track, should track cards same as artist
//TODO: page? davinky? react-router figure out what /track and /artist do :) 
//TODO: love our gf's
