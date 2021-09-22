import { useState } from "react";
import { Redirect } from "react-router-dom";
import TrackProfile from "./components/TrackProfile";

function Track({ setAlert, id }: { setAlert: any; id: string | null }) {
  const [redirect, setRedirect] = useState<string>("");
  let trackID = id;
  let trackProfile =
    trackID !== null ? (
      <TrackProfile
        id={trackID}
        setAlert={setAlert}
        setRedirect={setRedirect}
      />
    ) : (
      <Redirect to="/" />
    );
  return <>{redirect ? <Redirect to={redirect} /> : trackProfile}</>;
}

export default Track;
