
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      <iframe
        className="w-full h-full object-cover"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
          trailerVideo?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      {/* top gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

      {/* bottom fade-to-black gradient */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};
export default VideoBackground;
