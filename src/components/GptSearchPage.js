import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import { backgroundLOGO } from "../utils/constants";

const GptSearchPage = () => {
  return <div>
          <div className="fixed inset-0 -z-10"> 
            <img
              className="h-full w-full object-cover" 
              src={backgroundLOGO}
              alt="netflix-background"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
      <GptSearchBar/>
      <GptMoviesSuggestions/>
    </div>;
};

export default GptSearchPage;
