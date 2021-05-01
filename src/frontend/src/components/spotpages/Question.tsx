import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { SpotPhase } from '../Spot'

export default function Question({ setPhase }: { setPhase: React.Dispatch<React.SetStateAction<SpotPhase>> }) 
    :JSX.Element {
    return (
        <>
            <DialogTitle id="stat-dialog">Tell me about yourself</DialogTitle>
            <Divider></Divider>
            <DialogContent>
                <DialogContentText>
                    Do you have a favorite artist or track?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setPhase(SpotPhase.SearchByWeights) }}>
                    I don't know
                </Button>
                <Button onClick={() => { setPhase(SpotPhase.SearchByArtist) }} color="primary">
                    Artist
                </Button>
                <Button onClick={() => { setPhase(SpotPhase.SearchByTrack) }} color="primary">
                    Track
                </Button>
            </DialogActions>
        </>
    )
}