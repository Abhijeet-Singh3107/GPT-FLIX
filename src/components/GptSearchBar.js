import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import geminiAI from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies , setLoading } from "../utils/gptSlice";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

    // search for movie from TMDB API
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1' , API_OPTIONS);
    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // making call to gemini api to get Movie results
    const model = geminiAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // Call generateContent
    const geminiQuery = "Act as a movie recommendation system and suggest me 5-7 movies on the tpoic : " + searchText.current.value + " movies should be comma seperated like the example given ahead. Example: Don,Sholay,Golmaal,Phir Hera Pheri,Dhamaal";

    dispatch(setLoading(true));
    const geminiResults = await model.generateContent(geminiQuery);
    dispatch(setLoading(false));

        // converting the movie result in array.
    const finalResult = geminiResults.response.text().split(",");
    console.log(finalResult);

      // for each movie I will search TMDB API
    const promiseArray = finalResult.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovies({movieNames:finalResult, movieResults:tmdbResults}));
    
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black opacity-90 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 p-4 m-4 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
