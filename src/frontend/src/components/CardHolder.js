import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  unpopulated: {
    display: 'flex',
    "flex-direction": 'column',
    'min-width':'80%',
    'min-height':'50vh',
    'background-color': "lightgrey",
    'overflow': 'auto',
  },
  populated: {
    display: 'flex',
    "flex-direction": 'column',
    'min-width':'80%',
    'background-color': "lightgrey",
    'overflow': 'auto',
  }
}));

export const CardHolder = (props) => {
  const classes = useStyles();
  return (
   <div className={props.cards.length > 0 ? classes.populated : classes.unpopulated}>
       {props.cards}
   </div>
  );
}

export default CardHolder


