import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Correct import path

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-[300px] md:h-[420px] ${index === 1 ? "mt-5" : ""}`}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
