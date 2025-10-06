import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import geminiAI from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search for movie from TMDB API
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // making call to gemini api to get Movie results
    const model = geminiAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // Call generateContent
    const geminiQuery =
      "Act as a movie recommendation system and suggest me 5-7 movies on the tpoic : " +
      searchText.current.value +
      " movies should be comma seperated like the example given ahead. Example: Don,Sholay,Golmaal,Phir Hera Pheri,Dhamaal";
    const geminiResults = await model.generateContent(geminiQuery);

    // converting the movie result in array.
    const finalResult = geminiResults.response.text().split(",");
    console.log(finalResult);

    // for each movie I will search TMDB API
    const promiseArray = finalResult.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovies({ movieNames: finalResult, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center px-4">
      <form
        className="w-full md:w-1/2 bg-black opacity-90 grid grid-cols-1 md:grid-cols-12 gap-2 p-4 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-1 md:col-span-9 p-3 md:p-4 rounded-md text-white bg-gray-900 placeholder-white w-full"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-1 md:col-span-3 p-3 md:py-2 md:px-4 text-white bg-red-600 hover:bg-red-700 rounded-md w-full md:w-auto transition-colors"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
