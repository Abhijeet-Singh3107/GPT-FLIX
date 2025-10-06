
import { IMG_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200">
      <img
        className="
          rounded-lg 
          w-28 h-40   /* small screens */
          md:w-36 md:h-52  /* medium screens */
          lg:w-40 lg:h-60  /* large screens */
          object-cover
        "
        alt="movie card"
        src={IMG_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
