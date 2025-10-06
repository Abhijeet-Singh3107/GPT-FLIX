import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="relative z-10 bg-black text-white mt-[-4rem]">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming"} movies={movies.nowPlayingMovies} />
      </div>

      /* 
      MovIeListl - Popular
        MovieCard* n
      MovieList - Now Playing
      MovieList - Trending
      MovieList - Horror
      */
    )
  );
};

export default SecondaryContainer;
