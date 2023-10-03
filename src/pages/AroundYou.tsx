import { useAppSelector } from "../redux/store";
import { Error, Loader, SongCard } from "../components";
import { useGetTopSongsCoutryByGenreQuery } from "../redux/services/sazhamCore";
import { SongsType } from "../types";
import Metadata from "../hooks/Metadata";

const CountryTracks = () => {
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopSongsCoutryByGenreQuery("US");

  if (isFetching) return <Loader title="Loading Songs around you..." />;

  if (error) return <Error />;
  return (
    <>
      <Metadata
        title="Around You"
        desc="this is discover"
        canonical="around-you"
      />
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Around you
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.map((song: SongsType, i: number) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CountryTracks;
