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
    <div className="relative w-full h-screen">
      <VideoTitle
        orgTitle={original_title}
        engTitle={title}
        overview={overview}
      />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;
