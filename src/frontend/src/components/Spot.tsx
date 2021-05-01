import Dialog from '@material-ui/core/Dialog';
import Initial from './spotpages/Initial'
import Question from './spotpages/Question'
import SpotArtist from './spotpages/SpotArtist'
import SpotTrack from './spotpages/SpotTrack'
import LearnMore from './spotpages/LearnMore'
import LearnEvenMore from './spotpages/LearnEvenMore'

interface SpotProps {
    open: boolean,
    handleClose: any,
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

export default function Spot({open, handleClose, spotPhase, changePhase, setAlert}: SpotProps) {
    return (
        <Dialog onClose={() => { handleClose(false) }} aria-labelledby="stat-dialog" open={open}
            maxWidth={'lg'}>
            {renderSpot(spotPhase, changePhase, setAlert, handleClose)}
        </Dialog>
    )
}


function renderSpot(phase: SpotPhase, setPhase:any, setAlert:any, showDialog:any) {
    switch (phase) {
        case 'initial':
            return <Initial setPhase={setPhase}/>
        case 'learn more':
            return <LearnMore setPhase={setPhase}/>
        case 'question':
            return <Question setPhase={setPhase}/>
        case 'search by track':
            return <SpotTrack setAlert={setAlert} showDialog={showDialog}/>
        case 'search by artist':
            return <SpotArtist setAlert={setAlert} showDialog={showDialog}/>
        case 'search by weights':
            return;
        case 'explanation':
            return <LearnEvenMore setPhase={setPhase}/>
    }
}