import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';


function NoMatch() {
    return (
        <div className="error-page">
            <h1>Oopsie! Seems like this page doesn't exist.</h1>
            <Button variant="contained" color="primary">
                <Link to="/" style={{ textDecoration: 'none', color:'white'}}>Return to Home</Link>
            </Button>
        </div>
    )
}

export default NoMatch;