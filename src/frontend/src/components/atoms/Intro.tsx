import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  icon: {
    ["@media (max-width:300px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    ["@media (min-width:300px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    ["@media (min-width:700px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    ["@media (min-width:1024px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    ["@media (min-width:1780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
  },
}));

interface IntroProps {
  imgSrc: string;
  alt: string;
  name: string;
}

export default function Intro({ imgSrc, alt, name }: IntroProps) {
  const classes = useStyles();

  return (
    <div className="intro">
      <Avatar
        src={imgSrc}
        alt={`Profile picture of ${alt}`}
        className={classes.icon}
      />
      <h1>{name}</h1>
    </div>
  );
}
