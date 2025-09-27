import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>

      {/* 
        MainContainer
          - VideoBackground
          - VideoTit1e
        SecondaryContainer
          - MovirLisf * n
          - cards * n */
}
    </>
  );
};

export default Browse;
