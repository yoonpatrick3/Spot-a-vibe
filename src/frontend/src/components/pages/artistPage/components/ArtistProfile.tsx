import { SongCardType } from "../../../organisms/Card";
import CardHolder from "../../../organisms/CardHolder";
import SongCard from "../../../organisms/Card";
import Tooltip from "@material-ui/core/Tooltip";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PeopleIcon from "@material-ui/icons/People";
import AlbumIcon from "@material-ui/icons/Album";
import { address } from "../../../../App";
import CircularProgress from "@material-ui/core/CircularProgress";
import Intro from "../../../atoms/Intro";
import Stat, { formatStat } from "../../../organisms/Stat";
import Divider from "@material-ui/core/Divider";
import { formatErrorURL } from "../../trackPage/components/TrackProfile";
import { useEffect, useState } from "react";
import { defaultSpotifyImgLink } from "..";

interface SongJSON {
  id: string;
  danceability: number;
  valence: number;
  acousticness: number;
  energy: number;
  instrumentalness: number;
  popularity: number;
  img_link: string;
  title: string;
}

interface ArtistData {
  artist_name: string;
  artist_image: string;
  danceability: string;
  valence: string;
  acousticness: string;
  energy: string;
  instrumentalness: string;
  discography: any[];
  popularity: number;
  followers: number;
  genres: string;
}

function formatList(list: string[]): string {
  let trimmedList = list.slice(0, 3);
  let returnStr = trimmedList.toString();
  returnStr = returnStr.replaceAll(",", " | ");
  return returnStr;
}

function ArtistProfile({
  id,
  setAlert,
  setRedirect,
}: {
  id: string;
  setAlert: any;
  setRedirect: any;
}) {
  const initialState: ArtistData = {
    artist_name: "",
    artist_image: "",
    danceability: "",
    valence: "",
    acousticness: "",
    energy: "",
    instrumentalness: "",
    discography: [],
    popularity: 0,
    followers: 0,
    genres: "",
  };

  const [artistData, setArtistData] = useState<ArtistData>(initialState);

  useEffect(() => {
    fetch(`${address}/api/artist?artist_id=${id}`)
      .then((response) => {
        if (!response.redirected) {
          return response.json();
        } else {
          console.log(response.url);
          console.log(formatErrorURL(response.url));
          setRedirect(formatErrorURL(response.url));
          throw new Error("Redirected");
        }
      })
      .then((data) => {
        let danceability: number = 0;
        let valence: number = 0;
        let acousticness: number = 0;
        let energy: number = 0;
        let instrumentalness: number = 0;
        let popularity: number = data.popularity;
        let genres: string = formatList(data.genres);

        data.discography.forEach((song: SongJSON) => {
          danceability += song.danceability;
          valence += song.valence;
          acousticness += song.acousticness;
          energy += song.energy;
          instrumentalness += song.instrumentalness;
        });

        danceability /= data.discography.length;
        valence /= data.discography.length;
        acousticness /= data.discography.length;
        energy /= data.discography.length;
        instrumentalness /= data.discography.length;

        let strDanceability: string = formatStat(0.6, danceability);
        let strValence: string = formatStat(0.5, valence);
        let strAcousticness: string = formatStat(0.2, acousticness);
        let strEnergy: string = formatStat(0.6, energy);
        let strInstrumentalness: string = formatStat(0.03, instrumentalness);

        let discography = data.discography.map((song: SongJSON) => {
          return (
            <SongCard
              id={song.id}
              trackArtist={data.artist_name}
              trackName={song.title}
              imageURL={song.img_link}
              type={SongCardType.Track}
            ></SongCard>
          );
        });

        setArtistData({
          artist_name: data.artist_name,
          artist_image:
            data.images.length > 0 ? data.images[0].url : defaultSpotifyImgLink,
          danceability: strDanceability,
          valence: strValence,
          acousticness: strAcousticness,
          energy: strEnergy,
          instrumentalness: strInstrumentalness,
          discography: discography,
          popularity: popularity,
          followers: data["follower-count"],
          genres: genres,
        });
      })
      .catch((err) => {
        setAlert({
          show: true,
          message:
            "Something went wrong with your request. We cannot find the specified artist.",
        });
        console.log(err);
      });
  }, [id, setAlert, setRedirect]);

  return (
    <div className="artist-track-profile">
      {artistData.artist_name ? (
        <>
          <div className="artist-track-bio">
            <div className="artist-track-name">
              <Intro
                imgSrc={artistData.artist_image}
                alt={`Profile picture of ${artistData.artist_name}`}
                name={artistData.artist_name}
              ></Intro>
              <div className="artist-data">
                <Tooltip title="Followers on Spotify" aria-label="followers">
                  <h3>
                    <PeopleIcon color="disabled" /> {artistData.followers}
                  </h3>
                </Tooltip>
                <Tooltip
                  title="Popularity of artist (on a scale of 0-100)"
                  aria-label="popularity"
                >
                  <h3>
                    <WhatshotIcon color="secondary" /> {artistData.popularity}
                  </h3>
                </Tooltip>
                {artistData.genres.length > 0 ? (
                  <Tooltip title="Genre of music" aria-label="genre">
                    <h3>
                      <AlbumIcon color="disabled" /> {artistData.genres}
                    </h3>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Stat
              danceability={artistData.danceability}
              valence={artistData.valence}
              acousticness={artistData.acousticness}
              energy={artistData.energy}
              instrumentalness={artistData.instrumentalness}
              isTrack={false}
            ></Stat>
          </div>
          <Divider />
          <div className="results-page">
            <CardHolder cards={artistData.discography} />
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default ArtistProfile;