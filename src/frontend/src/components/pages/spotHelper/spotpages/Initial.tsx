import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { SpotPhase } from "..";

export default function Initial({
  setPhase,
}: {
  setPhase: React.Dispatch<React.SetStateAction<SpotPhase>>;
}): JSX.Element {
  return (
    <>
      <DialogTitle id="stat-dialog">Hi I'm Spot!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          I'm a music recommendation website that will get better as more people
          use me. I break down songs and give my best guess at a recommendation
          based on what you like.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setPhase(SpotPhase.LearnMore);
          }}
        >
          Learn more
        </Button>
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
