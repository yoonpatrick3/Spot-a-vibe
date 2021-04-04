import './App.css';
import React, { useState } from 'react';
import Search from './components/search';
import CardHolder from './components/CardHolder';
import Header from './components/header'

function App() {
  const [cards, updateCards] = useState([]);

  return (
    <div className="App">
      <Header></Header>
      <div className = "body">
        <Search className="search" updateFunc={updateCards} showSearchBar></Search>
        <CardHolder cards={cards}></CardHolder>
      </div>
    </div>
  );
}

export default App;