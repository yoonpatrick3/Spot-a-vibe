import { makeStyles } from '@material-ui/core/styles';

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

export const CardHolder = ({cards}: {cards: JSX.Element[]}) => {
  const classes = useStyles();
  return (
   <div className={cards.length > 0 ? classes.populated : classes.unpopulated}>
       {cards}
   </div>
  );
}

export default CardHolder


