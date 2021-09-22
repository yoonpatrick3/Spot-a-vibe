import Button from "@material-ui/core/Button";

export default function BackButton({ setShowing }: { setShowing: any }) {
  let move_right_style = {
    transform: `translate(0vw, 0px)`,
    "transition-duration": "1s",
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setShowing(move_right_style)}
      style={{ margin: "1em" }}
    >
      Back
    </Button>
  );
}
