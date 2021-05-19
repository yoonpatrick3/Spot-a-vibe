import NoMatch from './NoMatch'
import Track from './Track'
import Artist from './Artist'
import HomePage from './Homepage'

import { Switch, Route, useLocation } from 'react-router-dom'

function Body({setAlert, setSpot}: {setAlert: any, setSpot: any}) {
    const query = new URLSearchParams(useLocation().search);

    return (
        <Switch>
            <Route exact path="/">
                <HomePage setAlert={setAlert} />
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