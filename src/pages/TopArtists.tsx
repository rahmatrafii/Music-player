import { ArtistCard, Error, Loader } from "../components";
import Metadata from "../hooks/Metadata";
import { useGetSongsByGenreQuery } from "../redux/services/sazhamCore";
import { SongsType } from "../types";
const TopArtists = () => {
  const { data, isFetching, error } = useGetSongsByGenreQuery("POP");
  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;
  return (
    <>
      <Metadata
        title="Top Artists"
        canonical="top-artists"
        desc="this is discover Top Artists"
      />

      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Top artists
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.map((track: SongsType) => (
            <ArtistCard key={track.key} track={track} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopArtists;
