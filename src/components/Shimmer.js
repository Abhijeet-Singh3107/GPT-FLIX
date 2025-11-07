// src/components/Shimmer.jsx
import React from "react";

const Shimmer = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 text-white">
      <h1 className="text-3xl md:text-5xl font-bold animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default Shimmer;
