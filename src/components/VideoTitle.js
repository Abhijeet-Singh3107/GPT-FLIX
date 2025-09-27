const VideoTitle = ({ orgTitle, engTitle, overview }) => {
  return (
    <div className="pt-[20%] px-16 absolute top-0 left-0 text-white z-10 max-w-xl">
      <h1 className="font-bold text-4xl drop-shadow-lg leading-tight">
        {engTitle}
      </h1>
      <p className="py-6 text-lg text-gray-200 leading-relaxed">{overview}</p>

      <div className="flex gap-4 mt-4">
        <button className="flex items-center gap-2 bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition duration-200">
          ▶️ Play
        </button>
        <button className="flex items-center gap-2 bg-gray-700 bg-opacity-70 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
