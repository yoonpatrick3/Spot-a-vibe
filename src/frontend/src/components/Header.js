import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../resources/spot_a_like.png'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "background-color": "rgb(50, 50, 50)"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Link to="/">
                        <Avatar alt="Spot-a-vibe logo" src={Logo} />
                    </Link>
                </IconButton>
                <Typography variant="h4" className={classes.title}>
                    SPOT-A-VIBE
                </Typography>
                <Button color="inherit" href="https://github.com/yoonpatrick3/Spot-a-like" target="_blank">Source</Button>
            </Toolbar>
        </AppBar>
    );
}