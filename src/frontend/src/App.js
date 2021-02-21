import './App.css';
import React, { useState } from 'react';
import Search from './components/search';
import SongCard from './components/card';
import CardHolder from './components/CardHolder';

function App() {
  const [cards, updateCards] = useState([]);

  return (
    <div className="App">
      <Search updateFunc={updateCards}></Search>
      <CardHolder cards={cards}></CardHolder>
    </div>
  );
}

export default App;