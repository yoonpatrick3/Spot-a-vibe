import "./stylesheets/App.css";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/organisms/Header";
import { BrowserRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Spot from "./components/pages/spotHelper";
import Fab from "@material-ui/core/Fab";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { SpotPhase } from "./components/pages/spotHelper";
import NoMatch from "./components/pages/errorPage";
import Track from "./components/pages/trackPage";
import Artist from "./components/pages/artistPage";
import HomePage from "./components/pages/homePage";

import { Switch, Route, useLocation } from "react-router-dom";

export const address =
  process.env.PUBLIC_URL ?? "https://spot-a-vibe.herokuapp.com";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export interface AlertMessage {
  show: boolean;
  message: string;
}

function Body({ setAlert, setSpot }: { setAlert: any; setSpot: any }) {
  const query = new URLSearchParams(useLocation().search);

  return (
    <Switch>
      <Route exact path="/">
        <HomePage setAlert={setAlert} />
      </Route>
      <Route path="/artist">
        <Artist id={query.get("id")} setAlert={setAlert} />
      </Route>
      <Route path="/track">
        <Track id={query.get("id")} setAlert={setAlert} />
      </Route>
      <Route path="*">
        <NoMatch message={query.get("msg")} setSpot={setSpot} />
      </Route>
    </Switch>
  );
}

function App() {
  const [showAlert, setAlert] = useState<AlertMessage>({
    show: false,
    message: "",
  });
  const [spotPhase, changePhase] = useState<SpotPhase>(SpotPhase.Initial);
  const [spot, setSpot] = useState<boolean>(true);
  const classes = useStyles();

  function openSpot() {
    changePhase(SpotPhase.Initial);
    setSpot(true);
  }

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ show: false, message: "" });
  };

  useEffect(() => {
    document.title = "Spot a Vibe";
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header setAlert={setAlert}></Header>
        <Body setAlert={setAlert} setSpot={setSpot}></Body>
        <Spot
          open={spot}
          showSpotDialog={setSpot}
          spotPhase={spotPhase}
          changePhase={changePhase}
          setAlert={setAlert}
        />
      </div>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "1em", right: "1em" }}
        onClick={openSpot}
      >
        <ContactSupportIcon className={classes.extendedIcon} />
        Need help?
      </Fab>
      <Snackbar
        open={showAlert.show}
        autoHideDuration={15000}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          onClose={() => {
            setAlert({ show: false, message: "" });
          }}
        >
          {showAlert.message}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
}

export default App;
