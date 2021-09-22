import React from "react";
import CardHolder from "../../../organisms/CardHolder";
import BackButton from "../../../atoms/BackButton";

interface ResultsPageProps {
  setShowing: any;
  cards: any[];
}

export default function ResultsPage({ setShowing, cards }: ResultsPageProps) {
  return (
    <div className="results-page">
      <BackButton setShowing={setShowing} />
      <CardHolder cards={cards}></CardHolder>
    </div>
  );
}
