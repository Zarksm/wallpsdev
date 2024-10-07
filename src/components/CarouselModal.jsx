import React, { useState, useEffect } from "react";
import Image from "next/image";

const CarouselModal = ({ images, currentIndex, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex); // State to track the active index

  useEffect(() => {
    setActiveIndex(currentIndex); // Update active index when currentIndex changes
  }, [currentIndex]);

  // Function to close the modal
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Navigate to previous image
  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsImageLoaded(false); // Reset image load state for transition
  };

  // Navigate to next image
  const nextImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setIsImageLoaded(false); // Reset image load state for transition
  };

  // Handle image load state
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Safety check to avoid accessing undefined images
  const currentImage = images[activeIndex] || {};

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      style={{
        animation: !isClosing ? "fadeIn 0.3s" : "none",
      }}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={closeModal}
      >
        &times;
      </button>
      {/* Image carousel */}
      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          className="absolute left-5 text-white text-5xl hover:scale-110 transition-transform duration-300 z-50"
          onClick={prevImage}
        >
          &#8592;
        </button>

        <div className="relative w-[80vw] h-[80vh] overflow-hidden">
          {/* Slide transition for images */}
          <div
            className={`transition-transform duration-300 ease-in-out ${
              isImageLoaded ? "transform-none" : "transform scale-105"
            }`}
          >
            <Image
              src={currentImage.image} // Use the safe currentImage object
              alt={currentImage.category || "Image"} // Provide a fallback alt text
              fill
              style={{
                objectFit: "contain",
                opacity: isImageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          className="absolute right-5 text-white text-5xl hover:scale-110 transition-transform duration-300"
          onClick={nextImage}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default CarouselModal;
