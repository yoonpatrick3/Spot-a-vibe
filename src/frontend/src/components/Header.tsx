import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import CasinoIcon from '@material-ui/icons/Casino';
import Toolbar from '@material-ui/core/Toolbar';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../resources/spot_a_like.png'
import { Link, Redirect } from 'react-router-dom'
import { address } from '../App'
import { AlertMessage } from '../App'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "background-color": "rgb(50, 50, 50)",
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));


export default function ButtonAppBar({ setAlert }: { setAlert: React.Dispatch<React.SetStateAction<AlertMessage>> }): JSX.Element {
    const classes = useStyles();
    const [redirect, setRedirect] = useState<JSX.Element>(<></>)

    function redirectRandom() {
        //get randomID 
        fetch(address + '/api/random')
            .then(response => {
                return response.json();
            })
            .then((data: { id: string }) => {
                setRedirect(<Redirect to={`/track?id=${data.id}`}></Redirect>);
            })
            .catch(err => {
                setAlert({ show: true, message: "Could not get a random song :( Please try again later." })
            })
    }

    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar className={classes.flex}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Link to="/">
                        <Avatar alt="Spot-a-vibe logo" src={Logo} />
                    </Link>
                </IconButton>
                <div className="nav-bar-icons">
                    <Link to="/">
                        <IconButton>
                            <HomeIcon style={{ color: 'white' }} />
                        </IconButton>
                    </Link>
                    <IconButton onClick={redirectRandom}>
                        <CasinoIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton href="https://github.com/yoonpatrick3/Spot-a-like" target="_blank">
                        <GitHubIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <div>
                    <Button color="inherit" href="https://github.com/yoonpatrick3/Spot-a-like" target="_blank">Source</Button>
                </div>
            </Toolbar>
            {redirect}
        </AppBar>
    );
}