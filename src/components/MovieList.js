import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative px-6 md:px-10">
      {/* Title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold py-4 text-white">
        {title}
      </h1>

      {/* Scrollable Row */}
      <div
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-4"
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
