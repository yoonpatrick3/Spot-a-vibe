import React, {useState} from 'react';
import NoMatch from './NoMatch'
import Track from './Track'
import Artist from './Artist'
import Search from './Search';
import ResultsPage from './ResultsPage'
import { Switch, Route, useLocation } from 'react-router-dom'

function Body() {
    const [cards, updateCards] = useState([]);
    const [showing, setShowing] = useState({});
    const query = new URLSearchParams(useLocation().search);

    return (
        <Switch>
            <Route exact path="/">
                <div className="body" style={showing}>
                    <Search className="search" updateFunc={updateCards} showSearchBar showing={showing} setShowing={setShowing}></Search>
                    <ResultsPage setShowing={setShowing} cards={cards} showing={showing}></ResultsPage>
                </div>
            </Route>
            <Route path="/artist">
                <Artist id={query.get("id")} />
            </Route>
            <Route path="/track">
                <Track id={query.get("id")} />
            </Route>
            <Route path="*">
                <NoMatch message={query.get("msg")}/>
            </Route>
        </Switch>
    )
}

export default Body;