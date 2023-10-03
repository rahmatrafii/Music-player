import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/sazhamCore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useAppSelector } from "../redux/store";
import { selectGenreListId } from "../redux/features/playerSlice";
import { SongsType } from "../types";
import Metadata from "../hooks/Metadata";

const Discover = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isPlaying, activeSong, genreListId } = useAppSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading song..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  return (
    <>
      <Metadata title="Discover" canonical="" desc="this is discover" />
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">
            Discover {genreTitle}
          </h2>
          <select
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer"
            value={genreListId || "POP"}
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          >
            {genres.map((genre: { value: string; title: string }) => (
              <option
                key={genre.value}
                value={genre.value}
                className="cursor-pointer"
              >
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.map((song: SongsType, i: number) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data?.tracks}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
