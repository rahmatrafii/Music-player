import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { AppDispatch, useAppSelector } from "../redux/store";
import { FreeMode } from "swiper/modules";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/sazhamCore";

import "swiper/css";
import "swiper/css/free-mode";
import { TopChartCardType } from "../types";
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: TopChartCardType) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data } = useGetSongsByGenreQuery("POP");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const topPlays = data?.tracks?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: any, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div ref={divRef} className="">
      <div className="xl:ml-4 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col  relative">
        <div className="w-full flex  flex-col ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
          <div className="mt-4 xl:h-[300px] custom-scrollbar flex flex-col gap-1  overflow-y-auto">
            {topPlays?.map((song: any, i: number) => (
              <TopChartCard
                key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, i)}
              />
            ))}
          </div>
        </div>

        <div className="w-full  flex  flex-col mt-3 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            centeredSlides
            centeredSlidesBounds
            freeMode
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlays?.slice(0, 5).map((artist: any) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist?.artists[0].adamid}`}>
                  <img
                    src={artist?.images?.background}
                    alt="Name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
