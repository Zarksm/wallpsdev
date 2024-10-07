import React, { useState } from "react";
import Image from "next/image";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { AiOutlineDownload } from "react-icons/ai";
import CarouselModal from "./CarouselModal";

const ImageCard = ({ item, index, images, onDownload }) => {
  // Add onDownload prop
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const openCarousel = () => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeCarousel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        key={item.id}
        className={`relative bg-gray-200 w-full h-[450px] md:h-[420px] cursor-pointer group p-4 rounded-xl overflow-hidden ${
          index % 3 === 1 ? "mt-5" : ""
        }`}
      >
        <Image
          src={item.image}
          alt={item.category}
          fill
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="flex flex-row justify-center gap-5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 md:bottom-10 right-5 md:left-0 md:right-0 mx-auto md:bg-pink-600 bg-pink-500 bg-opacity-80 md:bg-opacity-50 w-max py-2 px-6 rounded-xl">
          <LiaSearchPlusSolid
            className="text-3xl text-white hover:text-black md:hover:text-pink-500 duration-300"
            onClick={openCarousel}
          />
          <a
            href={item.image}
            download={`wallps_${item.category}.jpg`}
            onClick={onDownload} // Call onDownload when the link is clicked
          >
            <AiOutlineDownload className="text-3xl text-white hover:text-black md:hover:text-pink-500 duration-300" />
          </a>
        </div>
      </div>

      {isOpen && (
        <CarouselModal
          images={images}
          currentIndex={currentIndex}
          onClose={closeCarousel}
        />
      )}
    </div>
  );
};

export default ImageCard;
