import { useState, useEffect } from "react";
import CardHolder from "../../../organisms/CardHolder";
import SongCard from "../../../organisms/Card";
import { SongCardType } from "../../../organisms/Card";
import { address } from "../../../../App";
import { defaultSpotifyImgLink } from "../../artistPage";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import { TrackJSON } from "../../homePage/homeInterfaces/Search";
import { ErrorHandlingProps } from "./SearchByWeights";

export default function SpotTrack({
  setAlert,
  showSpotDialog,
}: ErrorHandlingProps): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [confirmationQuestion, setConfirmation] = useState<boolean>(false);

  const handleInput = (ev: any): void => {
    setInput(ev.target.value);
  };

  function fetchByTrack() {
    return new Promise<void>((resolve, reject) => {
      input.replaceAll(" ", "%20");
      fetch(address + "/apiSearch?q=" + input + "&type=track")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let track_array = data.items.map((track: TrackJSON) => {
            let url =
              track.images.length > 0
                ? track.images[0].url
                : defaultSpotifyImgLink;

            return (
              <div
                onClick={() => {
                  showSpotDialog(false);
                }}
              >
                <SongCard
                  id={track.id}
                  trackArtist={track.artist_name}
                  trackName={track.track_name}
                  imageURL={url}
                  type={SongCardType.Track}
                ></SongCard>
              </div>
            );
          });
          setCards(track_array.slice(0, 6));
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const handleEnterPressed = (ev: any) => {
    if (ev.key === "Enter") {
      if (input !== "") {
        fetchByTrack()
          .then(() => {
            setConfirmation(true);
          })
          .catch((err) => {
            setAlert({
              show: true,
              message:
                "Something went wrong with your request. Please confirm you are using https.",
            });
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    return () => {
      setConfirmation(false);
    };
  }, []);

  return (
    <>
      {confirmationQuestion ? (
        <>
          <DialogTitle id="spot-dialog">Track</DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <DialogContentText>
              {cards.length > 1
                ? "I found a couple. Let me know which one you meant."
                : "Can you specify what you meant?"}
            </DialogContentText>
            <CardHolder cards={cards} />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle id="spot-dialog">Track</DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <DialogContentText>What's your favorite track?</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="track"
              label="Track"
              fullWidth
              onKeyPress={handleEnterPressed}
              onChange={handleInput}
            />
          </DialogContent>
        </>
      )}
    </>
  );
}
