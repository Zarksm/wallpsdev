"use client";

import React, { useState, useEffect } from "react";
import { imageData } from "../utils/wallpsimg"; // Import the image data
import ImageCard from "../components/ImageCard"; // Import ImageCard component
import LoadMoreButton from "../components/LoadMoreButton"; // Import LoadMoreButton component
import SkeletonLoader from "../components/SkeletonLoader"; // Import SkeletonLoader component
import Filter from "../components/Filter"; // Import the Filter component
import Downloaded from "./Downloaded";

// Function to shuffle the array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 images
  const [loading, setLoading] = useState(false); // State to manage loading
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
  const [resolutionFilter, setResolutionFilter] = useState(""); // State for resolution filter
  const [downloadCount, setDownloadCount] = useState(0); // Track downloads
  const [shuffledImages, setShuffledImages] = useState([]); // State for shuffled images

  // Shuffle images on component mount
  useEffect(() => {
    const shuffled = shuffleArray([...imageData]); // Shuffle the images
    setShuffledImages(shuffled); // Set the shuffled images
  }, []); // Empty dependency array means this effect runs only once, on mount

  // Function to load more images
  const loadMoreImages = () => {
    if (loading) return; // Prevent multiple clicks while loading

    setLoading(true); // Set loading state to true

    setTimeout(() => {
      setVisibleCount((prevCount) =>
        Math.min(prevCount + 3, filteredImages.length)
      ); // Load 3 more images or up to the total count
      setLoading(false); // Reset loading state
    }, 2000); // 2 seconds delay
  };

  // Filter images based on selected category and resolution
  const filteredImages = shuffledImages.filter((item) => {
    const matchesCategory = categoryFilter
      ? item.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    const matchesResolution = resolutionFilter
      ? resolutionFilter === "desktop"
        ? item.image.includes("/desktop/")
        : item.image.includes("/phone/")
      : true;
    return matchesCategory && matchesResolution;
  });

  const handleDownload = () => {
    setDownloadCount((prev) => prev + 1);
  };

  return (
    <div className="relative">
      ss
      <Filter
        setCategoryFilter={setCategoryFilter}
        setResolutionFilter={setResolutionFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {filteredImages.slice(0, visibleCount).map((item, index) => (
          <div
            key={item.id}
            className={`${item.res === "desktop" ? "row-span-1" : "row-span-2"
              }`}
          >
            <ImageCard
              key={item.id}
              item={item}
              index={index}
              images={filteredImages}
              onDownload={handleDownload}
            />
          </div>
        ))}

        {/* Skeleton loader for images not yet loaded */}
        {loading && <SkeletonLoader />}

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <LoadMoreButton loading={loading} loadMoreImages={loadMoreImages} />
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <Downloaded
          visible={downloadCount > 0}
          onClose={() => setDownloadCount(0)}
        />
      </div>
    </div>
  );
};

export default Gallery;

{
  /* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {filteredImages.slice(0, visibleCount).map((item, index) => (
          <ImageCard
            key={item.id}
            item={item}
            index={index}
            images={filteredImages}
            onDownload={handleDownload} // Pass the download handler
          />
        ))}

        
        {loading && <SkeletonLoader />}

        
        {visibleCount < filteredImages.length && (
          <LoadMoreButton loading={loading} loadMoreImages={loadMoreImages} />
        )}
      </div> */
}
