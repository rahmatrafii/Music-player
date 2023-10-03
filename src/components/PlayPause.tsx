import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { PlayPausetype } from "../types";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}: PlayPausetype) => {
  const newActivesong = activeSong?.title
    ? activeSong?.title
    : activeSong?.heading?.title
    ? activeSong?.heading?.title
    : activeSong?.attributes?.albumName
    ? activeSong?.attributes?.albumName
    : null;

  const newSong = song?.title
    ? song?.title
    : song?.heading?.title
    ? song?.heading?.title
    : song?.attributes?.albumName
    ? song?.attributes?.albumName
    : null;
  return isPlaying && newActivesong === newSong ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
