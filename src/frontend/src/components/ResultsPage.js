import React from 'react';
import CardHolder from './CardHolder';
import BackButton from './BackButton';

export default function ResultsPage(props) {
    return (
        <div className="results-page">
            <BackButton setShowing={props.setShowing} />
            <CardHolder cards={props.cards}></CardHolder>
        </div>
    )
}