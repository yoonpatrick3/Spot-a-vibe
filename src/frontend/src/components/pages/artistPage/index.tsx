import { useState } from "react";
import { Redirect } from "react-router-dom";
import ArtistProfile from "./components/ArtistProfile";

export const defaultSpotifyImgLink =
  "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png";

function Artist({ setAlert, id }: { setAlert: any; id: string | null }) {
  const [redirect, setRedirect] = useState<string>("");
  let artistID = id;
  let artistProfile =
    artistID !== null ? (
      <ArtistProfile
        id={artistID}
        setAlert={setAlert}
        setRedirect={setRedirect}
      />
    ) : (
      <Redirect to="/" />
    );
  return <>{redirect ? <Redirect to={redirect} /> : artistProfile}</>;
}

export default Artist;
