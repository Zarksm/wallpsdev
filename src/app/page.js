import React from "react";
import Gallery from "@/components/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import RequestSheet from "@/components/RequestSheet";

const page = () => {
  return (
    <div className="bg-black md:w-full min-h-screen px-10 md:px-56 py-10 flex justify-center">
      <div className="w-full md:w-full lg:max-w-[920px]">
        <div className="w-full  h-auto flex justify-between text-white">
          <div className="font-playwrite font-bold text-2xl">
            <span className="text-pink-500">W</span>allps
          </div>
          <div>
            <RequestSheet />
          </div>
        </div>
        {/* images */}
        <div className="w-full h-auto">
          <Gallery />
        </div>
      </div>
    </div>
  );
};

export default page;
