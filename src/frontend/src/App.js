import './App.css';
import React from 'react';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'
import Body from './components/Body'

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Body></Body>
      </div>
    </BrowserRouter>
  );
}



export default App;