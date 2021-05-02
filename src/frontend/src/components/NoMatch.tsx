import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';

interface MessageProps {
    message: string | null,
    setSpot: any
}

function NoMatch({message, setSpot}: MessageProps) {

    useEffect(() => {
        setSpot(false)
    }, [])

    return (
        <div className="error-page">
            {message !== null ? <h1>{'Oops! Seems like there was a mistake: "' + message.replaceAll("_", " ") + '."'} </h1>:
            <h1>Oopsie! Seems like this page doesn't exist.</h1>}
            <Button variant="contained" color="primary">
                <Link to="/" style={{ textDecoration: 'none', color:'white'}}>Return to Home</Link>
            </Button>
        </div>
    )
}

export default NoMatch;