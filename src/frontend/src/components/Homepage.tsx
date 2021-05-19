import { useState} from 'react';
import Search from './Search';
import ResultsPage from './ResultsPage'
import { AlertMessage } from '../App'

export default function HomePage({setAlert}: {setAlert:React.Dispatch<React.SetStateAction<AlertMessage>>}) {
    const [cards, updateCards] = useState([]);
    const [showing, setShowing] = useState({});

    return (
        <div className="body" style={showing}>
            <Search updateFunc={updateCards} setShowing={setShowing} setAlert={setAlert} isTrack={false}></Search>
            <ResultsPage setShowing={setShowing} cards={cards}></ResultsPage>
        </div>
    )
}