import { useState } from "react";
import { AlertMessage } from "../../../App";
import ResultsPage from "./homeInterfaces/ResultsPage";
import Search from "./homeInterfaces/Search";

export default function HomePage({
  setAlert,
}: {
  setAlert: React.Dispatch<React.SetStateAction<AlertMessage>>;
}) {
  const [cards, updateCards] = useState([]);
  const [showing, setShowing] = useState({});

  return (
    <div className="body" style={showing}>
      <Search
        updateFunc={updateCards}
        setShowing={setShowing}
        setAlert={setAlert}
        isTrack={false}
      ></Search>
      <ResultsPage setShowing={setShowing} cards={cards}></ResultsPage>
    </div>
  );
}
