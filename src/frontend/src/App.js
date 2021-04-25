import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'
import Body from './components/Body'
import Alert from '@material-ui/lab/Alert';

export const address = 'http://localhost:5000'


function App() {

  const [showAlert, setAlert] = useState("")

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        {showAlert ? <Alert severity="error" onClose={() => {setAlert("")}}>{showAlert}</Alert>: <></> }
        <Body setAlert={setAlert}></Body>
      </div>
    </BrowserRouter>
  );
}



export default App;