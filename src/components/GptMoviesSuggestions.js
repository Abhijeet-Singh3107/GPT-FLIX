import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import Shimmer from './Shimmer';

const GptMoviesSuggestions = () => {
  const {movieNames , movieResults , loading} = useSelector((store) => store.gpt);

  if (loading) return <Shimmer />
    
  if(!movieNames) return null;

  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-70'>
      <div >
        {movieNames.map((movieName , index) => <MovieList key={{movieName}} title={movieName} movies={movieResults[index]}/>)}
      </div>
    </div>
  )
}

export default GptMoviesSuggestions;