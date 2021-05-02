import {useState} from 'react';
import NoMatch from './NoMatch'
import Track from './Track'
import Artist from './Artist'
import Search from './Search';
import ResultsPage from './ResultsPage'
import { Switch, Route, useLocation } from 'react-router-dom'

function Body({setAlert, setSpot}: {setAlert: any, setSpot: any}) {
    const [cards, updateCards] = useState([]);
    const [showing, setShowing] = useState({});
    const query = new URLSearchParams(useLocation().search);

    return (
        <Switch>
            <Route exact path="/">
                <div className="body" style={showing}>
                    <Search updateFunc={updateCards} setShowing={setShowing} setAlert={setAlert} isTrack={false}></Search>
                    <ResultsPage setShowing={setShowing} cards={cards}></ResultsPage>
                </div>
            </Route>
            <Route path="/artist">
                <Artist id={query.get("id")} setAlert={setAlert}/>
            </Route>
            <Route path="/track">
                <Track id={query.get("id")} setAlert={setAlert}/>
            </Route>
            <Route path="*">
                <NoMatch message={query.get("msg")} setSpot={setSpot}/>
            </Route>
        </Switch>
    )
}

export default Body;