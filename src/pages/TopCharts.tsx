import { Error, Loader, SongCard } from "../components";
import Metadata from "../hooks/Metadata";
import { useGetSongsByGenreQuery } from "../redux/services/sazhamCore";
import { useAppSelector } from "../redux/store";

const TopCharts = () => {
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery("POP");
  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  return (
    <>
      <Metadata
        title="Top Charts"
        canonical="top-charts"
        desc="this is Top Charts"
      />
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Discover Top Charts
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.map((song: any, i: number) => (
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

export default TopCharts;
