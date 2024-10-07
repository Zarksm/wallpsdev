import React from "react";

const LoadMoreButton = ({ loading, loadMoreImages }) => {
  return (
    <div className="col-span-full flex justify-center mt-4">
      <button
        onClick={loadMoreImages}
        className="bg-pink-500 bg-opacity-50 text-white px-4 py-2 rounded-md hover:bg-pink-600 hover:bg-opacity-70 transition duration-300"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
