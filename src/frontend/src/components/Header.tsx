import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import CasinoIcon from '@material-ui/icons/Casino';
import Toolbar from '@material-ui/core/Toolbar';
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../resources/spot_a_like.png'
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, Redirect } from 'react-router-dom'
import { address } from '../App'
import { AlertMessage } from '../App'
import '../App.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "background-color": "rgb(50, 50, 50)",
        color: "white"
    },
    title: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: '100%'
    },
    center: {
        display: 'flex',
        alignItems: 'center'
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        '@media (min-width:400px)': {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        '@media (max-width:400px)': {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '@media (min-width:600px)': {
            width: '12ch',
            '&:focus': {
                width: '12ch',
            },
        },
        '@media (min-width:900px)': {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
        '@media (max-width:600px)': {
            width: '0',
        },
    },
}));



export default function ButtonAppBar({ setAlert }: { setAlert: React.Dispatch<React.SetStateAction<AlertMessage>> }): JSX.Element {
    const classes = useStyles();
    const [redirect, setRedirect] = useState<JSX.Element>(<></>)
    const [showSearch, setSearchVisibility] = useState<boolean>(false);
    const [input, setInput] = useState<string>("")

    function redirectRandom(): void {
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

    function handleInput(ev: any): void {
        setInput(ev.target.value)
    }

    function handleClick(): void {
        if (window.matchMedia("(max-width: 600px)").matches) {
            setSearchVisibility(true);
        }
    }

    function handleEnterPressed(ev: any): void {
        if (ev.key === 'Enter' && input !== "") {
            fetch(address + '/apiSearch?q=' + input.replaceAll(" ", "%20") + '&type=track')
                .then(response => {
                    return response.json();
                })
                .then((data: any) => {
                    if (data.items.length > 0) {
                        setRedirect(<Redirect to={`/track?id=${data.items[0].id}`}></Redirect>);
                        setSearchVisibility(false);
                    } else {
                        setAlert({ show: true, message: "Could not find the specified song :( Please try again." })
                    }
                })
                .catch(err => {
                    setAlert({ show: true, message: "Could not retrieve the song :( Please try again later." })
                })
        }
    }


    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar className={classes.flex}>
                <div className={classes.left}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Link to="/">
                            <Avatar alt="Spot-a-vibe logo" src={Logo} />
                        </Link>
                    </IconButton>
                </div>
                <div className={classes.center}>
                    <Link to="/">
                        <IconButton>
                            <HomeIcon style={{ color: 'white' }} />
                        </IconButton>
                    </Link>
                    <IconButton onClick={redirectRandom}>
                        <CasinoIcon style={{ color: 'white' }} id="dice-icon" />
                    </IconButton>
                    <IconButton href="https://github.com/yoonpatrick3/Spot-a-like" target="_blank">
                        <GitHubIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <div className={classes.right}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Find a song…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleInput}
                            onClick={handleClick}
                            onKeyPress={handleEnterPressed}
                        />
                    </div>
                </div>
            </Toolbar>
            {redirect}
            <Dialog onClose={() => { setSearchVisibility(false) }} aria-labelledby="search-dialog" open={showSearch}
                maxWidth={'md'}>
                <DialogTitle id="search-dialog">Find a song</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let me know what song you're thinking of.
                    </DialogContentText>
                    <TextField onChange={handleInput} onKeyPress={handleEnterPressed} fullWidth />
                </DialogContent>
            </Dialog>
        </AppBar >
    );
}