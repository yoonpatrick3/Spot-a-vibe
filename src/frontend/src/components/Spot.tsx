import Dialog from '@material-ui/core/Dialog';
import Initial from './spotpages/Initial'
import Question from './spotpages/Question'
import SpotArtist from './spotpages/SpotArtist'
import SpotTrack from './spotpages/SpotTrack'
import LearnMore from './spotpages/LearnMore'
import LearnEvenMore from './spotpages/LearnEvenMore'
import SearchByWeights from './spotpages/SearchByWeights'

interface SpotProps {
    open: boolean,
    showSpotDialog: any,
    spotPhase: SpotPhase,
    changePhase: any,
    setAlert: any
}

export enum SpotPhase{
    Initial= "initial",
    LearnMore= "learn more",
    Question= "question",
    SearchByTrack= "search by track",
    SearchByArtist= "search by artist",
    SearchByWeights= "search by weights",
    LearnEvenMore= "explanation"
}

export default function Spot({open, showSpotDialog, spotPhase, changePhase, setAlert}: SpotProps) {

    function renderSpot() {
        switch (spotPhase) {
            case SpotPhase.Initial:
                return <Initial setPhase={changePhase}/>
            case 'learn more':
                return <LearnMore setPhase={changePhase}/>
            case 'question':
                return <Question setPhase={changePhase}/>
            case 'search by track':
                return <SpotTrack setAlert={setAlert} showSpotDialog={showSpotDialog}/>
            case 'search by artist':
                return <SpotArtist setAlert={setAlert} showSpotDialog={showSpotDialog}/>
            case 'search by weights':
                return <SearchByWeights setAlert={setAlert} showSpotDialog={showSpotDialog}/>
            case 'explanation':
                return <LearnEvenMore setPhase={changePhase}/> 
            default:
                showSpotDialog(false);
                setAlert("Error displaying Spot")
        }
    }

    return (
        <Dialog onClose={() => { showSpotDialog(false) }} aria-labelledby="stat-dialog" open={open}
            maxWidth={'lg'}>
            {renderSpot()}
        </Dialog>
    )
}


