import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  // Early return to prevent rendering with incomplete data
  if (
    !movies.nowPlayingMovies ||
    !movies.popularMovies ||
    !movies.topRatedMovies ||
    !movies.topRatedShows
  )
    return null;

  return (
    <div className="bg-black text-white">
      <div
        // Changed: Made the negative margin and padding responsive.
        className="relative z-10 px-4 md:px-12 py-8 mt-[-2rem] md:mt-[-6rem] lg:mt-[-8rem]"
      >
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Top Rated Shows"} movies={movies.topRatedShows} />
      </div>
    </div>
  );
};

export default SecondaryContainer;

/* 
      MovIeListl - Popular
        MovieCard* n
      MovieList - Now Playing
      MovieList - Trending
      MovieList - Horror
      */
