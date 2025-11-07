import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedShows = () => {
  const dispatch = useDispatch();

    const checktopRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedShows = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedShows(json.results));
  };

  useEffect(() => {
    !checktopRatedMovies && getTopRatedShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedShows;