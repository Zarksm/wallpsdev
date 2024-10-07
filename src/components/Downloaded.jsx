import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Downloaded = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="bg-gray-800 min-w-[300px] max-w-[250px] md:min-w-[300px] md:max-w-[350px] text-white py-4 px-6 rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out border-pink-500">
        <div className="absolute right-6 top-6">
          <button
            onClick={onClose}
            className="text-white hover:text-pink-500 focus:outline-none"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <CardHeader className="flex justify-between items-start">
          <div className="relative">
            <CardTitle className="text-[45px] font-semibold text-pink-500 font-playwrite">
              Thank You!
            </CardTitle>
            <CardDescription className="text-sm text-white mt-8 italic">
              Your image has been downloaded.
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="mt-4 flex flex-col md:items-start">
          <p className="text-sm text-slate-500">
            Feel free to visit us again for more awesome wallpapers!
          </p>
          <div className="flex gap-2 text-xl mt-4">
            <FaInstagram className="cursor-pointer text-pink-500" />
            <FaTelegramPlane className="cursor-pointer text-blue-500" />
            <FaWhatsapp className="cursor-pointer text-green-500" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Downloaded;
