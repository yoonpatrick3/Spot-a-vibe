import { useState } from "react";
import StatDialog from "./StatDialog";
import StatTooltip from "./StatTooltip";

export function formatStat(average: number, stat: number) {
  let range: number;
  if (average <= 0.5) {
    range = stat;
  } else {
    range = 1 - stat;
  }

  if (stat <= average - 0.9 * range) {
    return "Very low";
  } else if (stat <= average - 0.25 * range) {
    return "Moderately low";
  } else if (stat <= average + 0.25 * range) {
    return "Neutral";
  } else if (stat <= average + 0.9 * range) {
    return "Moderately high";
  } else {
    return "Very high";
  }
}

interface StatProps {
  danceability: string;
  valence: string;
  acousticness: string;
  instrumentalness: string;
  isTrack: boolean;
  energy: string;
}

export default function Stat({
  danceability,
  valence,
  acousticness,
  instrumentalness,
  isTrack,
  energy,
}: StatProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="music-stats">
      <h2>
        Music Analysis:
        <StatTooltip setOpen={setOpen} />
      </h2>
      <p>Danceability: {danceability}</p>
      <p>Valence: {valence}</p>
      <p>Acousticness: {acousticness}</p>
      <p>Energy: {energy}</p>
      <p>Instrumentalness: {instrumentalness}</p>
      <StatDialog
        isTrack={isTrack}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
