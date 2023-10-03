import { TrackType } from "../../types";

const Track: React.FC<TrackType> = ({ isPlaying, isActive, activeSong }) => {
  const image = activeSong?.images?.coverart
    ? activeSong?.images?.coverart
    : activeSong?.images?.play
    ? activeSong?.images?.play
    : activeSong?.attributes?.artwork?.url
        .replace("{w}", "125")
        .replace("{h}", "125");

  const title = activeSong?.title
    ? activeSong?.title
    : activeSong?.heading?.title
    ? activeSong?.heading?.title
    : activeSong?.attributes?.name
    ? activeSong?.attributes?.name
    : "no title";

  const subtitle = activeSong?.subtitle
    ? activeSong?.subtitle
    : activeSong?.heading?.subtitle
    ? activeSong?.heading?.subtitle
    : activeSong?.attributes?.artistName
    ? activeSong?.attributes?.artistName
    : "no subtitle";
  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img src={image} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">{title}</p>
        <p className="truncate text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default Track;
