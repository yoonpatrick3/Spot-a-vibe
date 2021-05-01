import React from 'react';
import CardHolder from './CardHolder';
import BackButton from './BackButton';

interface ResultsPageProps {
    setShowing: any,
    cards: any[]
}

export default function ResultsPage({setShowing, cards}: ResultsPageProps) {
    return (
        <div className="results-page">
            <BackButton setShowing={setShowing} />
            <CardHolder cards={cards}></CardHolder>
        </div>
    )
}