import { address } from "../../../../App";
import { SongCardType } from "../../../organisms/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHolder from "../../../organisms/CardHolder";
import SongCard from "../../../organisms/Card";
import Intro from "../../../atoms/Intro";
import Stat, { formatStat } from "../../../organisms/Stat";
import Divider from "@material-ui/core/Divider";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Tooltip from "@material-ui/core/Tooltip";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { defaultSpotifyImgLink } from "../../artistPage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TrackData {
  danceability: string;
  valence: string;
  acousticness: string;
  energy: string;
  instrumentalness: string;
  popularity: number;
  artistName: string;
  img_link: string;
  trackTitle: string;
  similarSongs: JSX.Element[];
  artistID: string;
  album: string;
}

const initialTrack = {
  danceability: "",
  valence: "",
  acousticness: "",
  energy: "",
  instrumentalness: "",
  popularity: 0,
  artistName: "",
  img_link: "",
  trackTitle: "",
  similarSongs: [],
  artistID: "",
  album: "",
};

export function formatErrorURL(url: string): string {
  return url.substring(url.indexOf("/error"));
}

export default function TrackProfile({
  id,
  setAlert,
  setRedirect,
}: {
  id: string;
  setAlert: any;
  setRedirect: any;
}) {
  const [trackData, setTrackData] = useState<TrackData>(initialTrack);

  useEffect(() => {
    fetch(`${address}/api/track?track_id=${id}`)
      .then((response) => {
        if (!response.redirected) {
          return response.json();
        } else {
          setRedirect(formatErrorURL(response.url));
          throw new Error("Redirected");
        }
      })
      .then((data) => {
        let danceability: string = formatStat(0.6, data.danceability);
        let valence: string = formatStat(0.5, data.valence);
        let acousticness: string = formatStat(0.2, data.acousticness);
        let energy: string = formatStat(0.6, data.energy);
        let instrumentalness: string = formatStat(0.03, data.instrumentalness);
        console.log(data);

        let similarSongs = data.similar_songs.map(
          (song: {
            id: string;
            img_link: string;
            title: string;
            artist_name: string;
          }) => {
            let url = song.img_link ? song.img_link : defaultSpotifyImgLink;
            return (
              <SongCard
                id={song.id}
                trackArtist={song.artist_name}
                trackName={song.title}
                imageURL={url}
                type={SongCardType.Track}
              ></SongCard>
            );
          }
        );

        setTrackData({
          danceability: danceability,
          valence: valence,
          acousticness: acousticness,
          energy: energy,
          instrumentalness: instrumentalness,
          artistName: data.artist_name,
          img_link: data.img_link,
          trackTitle: data.title,
          popularity: data.popularity,
          similarSongs: similarSongs,
          artistID: data.artist_id,
          album: data.album,
        });
      })
      .catch((err) => {
        setAlert({
          show: true,
          message:
            "Something went wrong with your request. We cannot find the specified track. Please try again later.",
        });
        console.log(err);
      });
  }, [id, setAlert, setRedirect]);

  return (
    <div className="artist-track-profile">
      {trackData.artistName ? (
        <>
          <div className="artist-track-bio">
            <div className="artist-track-name">
              <Intro
                imgSrc={trackData.img_link}
                alt={`Picture of track: ${trackData.trackTitle}`}
                name={trackData.trackTitle}
              ></Intro>
              <div>
                <Tooltip title="Artist of the track" aria-label="artist-name">
                  <Link to={`/artist?id=${trackData.artistID}`}>
                    <h2>{trackData.artistName}</h2>
                  </Link>
                </Tooltip>
                <Tooltip title="Album" aria-label="album">
                  <h3>
                    <LibraryMusicIcon color="disabled" /> {trackData.album}
                  </h3>
                </Tooltip>
                <Tooltip
                  title="Popularity of track (on a scale of 0-100)"
                  aria-label="popularity"
                >
                  <h3>
                    <WhatshotIcon color="secondary" /> {trackData.popularity}
                  </h3>
                </Tooltip>
              </div>
            </div>
            <Stat
              danceability={trackData.danceability}
              valence={trackData.valence}
              acousticness={trackData.acousticness}
              energy={trackData.energy}
              instrumentalness={trackData.instrumentalness}
              isTrack={true}
            ></Stat>
          </div>
          <Divider />
          <div className="results-page">
            <h1>What we recommend:</h1>
            <CardHolder cards={trackData.similarSongs} />
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
