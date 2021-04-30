import './App.css';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'
import Body from './components/Body'
import Alert from '@material-ui/lab/Alert';
import Spot from './components/Spot'
import Fab from '@material-ui/core/Fab';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

export const address = 'http://localhost:5000'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const [showAlert, setAlert] = useState("")
  const [spotPhase, changePhase] = useState("initial");
  const [spot, setSpot] = useState(true);
  const classes = useStyles();

  function openSpot() {
    changePhase("initial")
    setSpot(true);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        {showAlert ? <Alert severity="error" onClose={() => { setAlert("") }}>{showAlert}</Alert> : <></>}
        <Body setAlert={setAlert}></Body>
        <Spot open={spot} handleClose={setSpot} spotPhase={spotPhase} changePhase={changePhase} setAlert={setAlert} />
      </div>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: '1em', right: '1em' }}
        onClick={openSpot}>
        <ContactSupportIcon className={classes.extendedIcon} />
          Need help?
      </Fab>
    </BrowserRouter>
  );
}



export default App;