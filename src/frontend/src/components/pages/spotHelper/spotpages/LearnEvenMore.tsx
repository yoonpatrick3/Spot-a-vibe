import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { SpotPhase } from "..";

export default function LearnEvenMore({
  setPhase,
}: {
  setPhase: React.Dispatch<React.SetStateAction<SpotPhase>>;
}): JSX.Element {
  return (
    <>
      <DialogTitle id="stat-dialog">Algorithm + Tech Stack</DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <DialogContentText className="spot-learn-more">
          <h3>Our recommendation algorithm:</h3>
          <p>
            Our application is powered by the Spotify API where we utilize the
            API for artist details, track details, track audio features, and
            searching by keyword. We have our own database server that stores
            the details of every song (and artist) users search for and engage
            with. This grants us faster look ups when a recommendation is
            requested.
          </p>
          <p>
            The details of each song, for example: danceability and
            instrumentalness, have numerical values. So when an user requests a
            recommendation, we first ask for a song to base our recommendation
            off of. We then comb through our database and find songs that are
            closest to the given song's numerical values. This is done through
            comparing the residual squared sum of the audio features (details)
            of each song.
          </p>

          <h3>Our tech stack:</h3>
          <p>
            On our backend, we used Python for its great support in data
            manipulation, very useful for our recommendation algorithm. Flask +
            Gunicorn is used for our routing and serving. Our backend serves a
            REST API for artist data and track data where we relay requests to
            Spotify's API and format relevant information back and storing
            relevant data into our MariaDB (MySQL) database. The Spotify API
            requires a client key and secret, so it is natural to have our
            server be an authenticated middleman. Our backend also supports an
            endpoint to generate recommendations. Since this is a single page
            application, all other requests are handled in client side
            rendering.
          </p>
          <p>
            Our front end includes pages displaying the homepage, artist profile
            pages, track profile pages, and 404 errors. React seemed like a
            natural choice due to our website having the same basic structure
            (artist and track profile pages), but changes with dynamic data.
            React's state management and Material UI's styling was very helpful
            in creating the front end. Our front makes REST API calls to our
            server and manipulate a JSON response. Additionally, TypeScript was
            used to help manage the expected shape of props and JSON objects.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setPhase(SpotPhase.Question);
          }}
          color="primary"
        >
          Get Started
        </Button>
      </DialogActions>
    </>
  );
}
