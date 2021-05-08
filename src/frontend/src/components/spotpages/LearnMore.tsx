import { useStyles } from '../Intro';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Cheng from '../../resources/cheng.jpg';
import David from '../../resources/smol_me.jpg';
import Patrick from '../../resources/patrick_yoon.jpg';
import Saahil from '../../resources/saahil.jpg';
import { SpotPhase } from '../Spot'

export default function LearnMore({ setPhase }: { setPhase: React.Dispatch<React.SetStateAction<SpotPhase>> })
    : JSX.Element {
    const classes = useStyles();
    return (
        <>
            <DialogTitle id="stat-dialog">Meet my parents!</DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
                <DialogContentText className="spot-learn-more">
                    <p>This project was made at HackBeanpot 2021 using the Spotify API. It is a flask and MySQL backend that serves a
                            React SPA. It is served using Gunicorn and the Heroku platform.</p>
                    <div>
                        <Divider />
                    </div>
                    <div className="spot-bios" id="patrick">
                        <Avatar src={Patrick} alt="Patrick Yoon" className={classes.icon} />
                        <p>This project's brain was created by Patrick Yoon. His algorithm is what drives our
                                recommendations! Patrick contributed greatly to the project's ideation.</p>
                    </div>
                    <div className="spot-bios" id="david">
                        <Avatar src={David} alt="David Yan" className={classes.icon} />
                        <p>Hi, I'm David! Didn't want to leave this project unfinished... so I hope you enjoy the finished product!
                                   Loved working on everything; the routing, UI/UX, and connecting it all together were super fun.</p>
                    </div>
                    <div className="spot-bios" id="saahil">
                        <Avatar src={Saahil} alt="Saahil Kumar" className={classes.icon} />
                        <p>Saahil helped design our database representation and oversaw its initialization. Saahil was indispensable in the routes,
                                    API calls, and team energy. :)</p>
                    </div>
                    <div className="spot-bios" id="cheng">
                        <Avatar src={Cheng} alt="Cheng Xi Tsou" className={classes.icon} />
                        <p>Cheng built the search form UI on the homepage, front and center! He also contributed greatly to project ideation with
                                    the idea to search by weights.</p>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setPhase(SpotPhase.LearnEvenMore) }}>
                    Learn Even More
                </Button>
                <Button onClick={() => { setPhase(SpotPhase.Question) }} color="primary">
                    Get Started
                </Button>
            </DialogActions>
        </>
    )
}