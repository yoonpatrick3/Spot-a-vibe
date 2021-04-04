import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 70,
    width: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 70,
  },
}));

export const SongCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        component='img'
        src={props.imageURL}
        title={props.trackName}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="caption" variant="caption">
            {props.trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.trackArtist}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default SongCard;
