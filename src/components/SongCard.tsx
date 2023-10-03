import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { SongCardType } from "../types";

const SongCard = ({ song, i, isPlaying, activeSong, data }: SongCardType) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const newActivesong = activeSong?.title
    ? activeSong?.title
    : activeSong?.heading?.title;
  const newSong = song?.title ? song?.title : song?.heading?.title;
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            newActivesong === newSong ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        </div>
        <img
          src={
            song?.images?.coverart
              ? song?.images?.coverart
              : song?.images?.default
          }
          alt="image"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song?.title ? song?.title : song?.heading?.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song?.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song?.subtitle ? song?.subtitle : song?.heading?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
