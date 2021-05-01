import './App.css';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'
import Body from './components/Body'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Spot from './components/Spot'
import Fab from '@material-ui/core/Fab';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { SpotPhase } from './components/Spot'

export const address = 'http://localhost:5000'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface AlertMessage {
  show: boolean,
  message: string
}

function App() {
  const [showAlert, setAlert] = useState<AlertMessage>({show: false, message: ""})
  const [spotPhase, changePhase] = useState<SpotPhase>(SpotPhase.Initial);
  const [spot, setSpot] = useState<boolean>(true);
  const classes = useStyles();

  function openSpot() {
    changePhase(SpotPhase.Initial)
    setSpot(true);
  }

  const handleClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({show: false, message: ""});
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
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
      <Snackbar open={showAlert.show} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          {showAlert.message}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
}



export default App;