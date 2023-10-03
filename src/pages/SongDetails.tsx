import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { AppDispatch, useAppSelector } from "../redux/store";
import {
  useGetDetailsSongQuery,
  useGetRecommendationsQuery,
} from "../redux/services/sazhamCore";
import Metadata from "../hooks/Metadata";
const SongDetails = () => {
  const { songid, id: artistId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetDetailsSongQuery(songid);
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetRecommendationsQuery(songid);

  if (isFetchingSongDetails && isFetchinRelatedSongs)
    return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: any, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <>
      <Metadata
        title={songData?.title}
        canonical="songs"
        desc="This is Songs Details"
      />
      <div className="flex flex-col">
        <DetailsHeader artistId={""} songData={songData} />
        <div className="mb-10">
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1]?.text.map((line: any, i: number) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-gray-400 text-base my-1"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-base my-1">
                Sorry, No lyrics found!
              </p>
            )}
          </div>
        </div>

        <RelatedSongs
          data={data?.tracks}
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

export default SongDetails;
