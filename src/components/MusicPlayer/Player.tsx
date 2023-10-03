import { useRef, useEffect } from "react";
import { Playertype } from "../../types";

const Player: React.FC<Playertype> = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: any) => {
  const ref = useRef<any>(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  const newActiveSong = activeSong?.hub?.actions[1]?.uri
    ? activeSong?.hub?.actions[1]?.uri
    : activeSong?.stores?.apple?.previewurl
    ? activeSong?.stores?.apple?.previewurl
    : activeSong?.attributes?.previews[0].url
    ? activeSong?.attributes?.previews[0].url
    : null;

  return (
    <audio
      src={newActiveSong}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
