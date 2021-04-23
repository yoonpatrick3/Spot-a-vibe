import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'height': 70,
    'min-height': 70,
    width: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    'align-items': 'baseline',
    'justify-content': 'center'
  },
  cover: {
    width: 70,
  },
}));

export const SongCard = (props) => {
  const classes = useStyles();

  return (
    <Link to={`/${props.type}?id=${props.id}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          component='img'
          src={props.imageURL}
          title={props.trackName}
        />
        <CardContent className={classes.content}>
          <Typography component="caption" variant="caption">
            {props.trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.trackArtist}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default SongCard;
