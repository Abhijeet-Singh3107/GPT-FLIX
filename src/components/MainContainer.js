import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return;
  const mainMovie = movies[0]; 
  // console.log(mainMovie);
  const { original_title, title, overview, id } = mainMovie;
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <VideoBackground movieId={id} />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-gradient-to-r from-black/70 to-transparent">
        <VideoTitle
          orgTitle={original_title}
          engTitle={title}
          overview={overview}
        />
      </div>
    </div>
  );
};
export default MainContainer;
