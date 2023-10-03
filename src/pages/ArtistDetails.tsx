import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DetailsHeader, Loader, RelatedSongs } from "../components";

import {
  useGetArtistDetailsQuery,
  useGetTopSongsArtistQuery,
} from "../redux/services/sazhamCore";
import { AppDispatch, useAppSelector } from "../redux/store";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { SongsType } from "../types";
import Metadata from "../hooks/Metadata";
const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetArtistDetailsQuery(artistId);
  const { data } = useGetTopSongsArtistQuery(artistId);
  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  const dispatch = useDispatch<AppDispatch>();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: SongsType, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <>
      <Metadata
        title={artistData?.data[0]?.attributes?.name}
        desc="This is Artis Details"
        canonical="artists"
      />
      <div className="flex flex-col">
        <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

        <RelatedSongs
          data={data?.data}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </div>
    </>
  );
};

export default ArtistDetails;
