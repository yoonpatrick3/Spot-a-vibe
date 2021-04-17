import './App.css';
import React, { useState } from 'react';
import Search from './components/search';
import Header from './components/header';
import ResultsPage from './components/ResultsPage'
import move_left_style from './components/Search'

function App() {
  const [cards, updateCards] = useState([]);
  const [showing, setShowing] = useState({});


  return (
    <div className="App">
      <Header></Header>
      <div className="body"  style = {showing}>
        <Search className="search" updateFunc={updateCards} showSearchBar showing={showing} setShowing={setShowing}></Search>
        {showing === move_left_style ? <></> : <ResultsPage setShowing = {setShowing} cards = {cards} showing = {showing}></ResultsPage>}
      </div>
    </div>
  );
}

export default App;