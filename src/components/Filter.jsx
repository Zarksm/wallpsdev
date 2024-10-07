"use client";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Filter = ({ setCategoryFilter, setResolutionFilter }) => {
  const [category, setCategory] = useState(""); // State for category
  const [resolution, setResolution] = useState(""); // State for resolution
  const [isVisible, setIsVisible] = useState(false); // Control visibility of filters

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Toggle filter visibility
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCategoryFilter(value); // Update parent component's filter
  };

  const handleResolutionChange = (value) => {
    setResolution(value);
    setResolutionFilter(value); // Update parent component's filter
  };

  const handleClearFilters = () => {
    setCategory(""); // Reset category state
    setResolution(""); // Reset resolution state
    setCategoryFilter(""); // Reset category filter in parent
    setResolutionFilter(""); // Reset resolution filter in parent
  };

  return (
    <div className="text-white flex flex-col md:flex-row items-center gap-3 py-10">
      <div className="flex flex-col md:flex-row gap-3 w-full overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border border-white w-max rounded-md cursor-pointer transition-transform duration-300"
                onClick={toggleVisibility} // Toggle dropdown visibility
              >
                <IoSettingsSharp className="transition-transform duration-300 hover:rotate-180" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Dropdowns Container */}
        <div
          className={`flex flex-col md:flex-row gap-3 transition-all duration-200 ${
            isVisible ? "ml-0" : "ml-[-2000px]"
          }`}
        >
          <div className="flex items-center">
            <Select onValueChange={handleCategoryChange} value={category}>
              <SelectTrigger className="w-[280px] text-white rounded-md">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Animal">Animals</SelectItem>
                  <SelectItem value="Islamic">Islamic</SelectItem>
                  <SelectItem value="Aesthetic">Aesthetic</SelectItem>
                  <SelectItem value="Nature">Nature</SelectItem>
                  <SelectItem value="Space and Sci-Fi">
                    Space and Sci-Fi
                  </SelectItem>
                  <SelectItem value="Abstract and Minimalist">
                    Abstract and Minimalist
                  </SelectItem>
                  <SelectItem value="Cityscapes and Architecture">
                    Cityscapes and Architecture
                  </SelectItem>
                  <SelectItem value="Fantasy and Superheroes">
                    Fantasy and Superheroes
                  </SelectItem>
                  <SelectItem value="Cars and Vehicles">
                    Cars and Vehicles
                  </SelectItem>
                  <SelectItem value="Art and Photography">
                    Art and Photography
                  </SelectItem>
                  <SelectItem value="Anime and Gaming">
                    Anime and Gaming
                  </SelectItem>
                  <SelectItem value="Quotes and Typography">
                    Quotes and Typography
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Select onValueChange={handleResolutionChange} value={resolution}>
              <SelectTrigger className="w-[280px] text-white rounded-md">
                <SelectValue placeholder="Select Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Device</SelectLabel>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Button
              className="bg-transparent text-white border text-xs"
              onClick={handleClearFilters} // Clear filters on click
            >
              Clear filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
