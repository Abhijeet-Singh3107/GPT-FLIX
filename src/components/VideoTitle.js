const VideoTitle = ({ org_title , title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[25%] sm:pt-[22%] md:pt-[18%] px-6 md:px-16 lg:px-24 absolute text-white bg-gradient-to-r from-black to-transparent">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text45xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
        {title}
      </h1>

      {/* Overview */}
      <p className="hidden sm:block py-4 sm:py-5 md:py-4 text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 opacity-90">
        {overview}
      </p>

      {/* Buttons */}
      <div className="mt-3 sm:mt-4 md:mt-6 flex flex-wrap gap-3">
        <button className="bg-white text-black py-1.5 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-10 text-sm sm:text-base md:text-lg rounded-lg font-semibold hover:bg-opacity-80 transition">
          ▶ Play
        </button>

        <button className="hidden sm:inline-block bg-gray-500/50 text-white py-1.5 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-10 text-sm sm:text-base md:text-lg rounded-lg font-semibold hover:bg-gray-500/80 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
