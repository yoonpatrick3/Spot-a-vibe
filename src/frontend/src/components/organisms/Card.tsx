import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export enum SongCardType {
  Artist = "artist",
  Track = "track",
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 100,
    "min-height": 100,
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    "align-items": "baseline",
    "justify-content": "center",
  },
  cover: {
    width: 70,
  },
}));

interface SongCardProps {
  id: string;
  type: SongCardType;
  imageURL: string;
  trackName: string;
  trackArtist: string;
}

export const SongCard = ({
  id,
  type,
  imageURL,
  trackName,
  trackArtist,
}: SongCardProps) => {
  const classes = useStyles();

  return (
    <Link to={`/${type}?id=${id}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          component="img"
          src={imageURL}
          title={trackName}
        />
        <CardContent className={classes.content}>
          <Typography component="caption" variant="caption">
            {trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {trackArtist}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SongCard;
