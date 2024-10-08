"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaMessage } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast"; // Import the toast hook

const RequestSheet = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const { toast } = useToast(); // Initialize the toast
  const [isOpen, setIsOpen] = useState(false); // State to manage sheet visibility

  const handleSend = async () => {
    setLoading(true); // Set loading to true
    try {
      const res = await fetch("/api/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        toast({
          description: "Your message has been sent.", // Show toast on success
        });
        setName(""); // Clear the form fields after success
        setMessage("");
        setIsOpen(false); // Close the sheet on success
      } else {
        const errorMessage = await res.text(); // Get error message from response
        toast({
          description: `Failed to send request: ${errorMessage}`, // Show toast on failure
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "An error occurred while sending the request", // Show toast on error
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}> {/* Control open state */}
      <SheetTrigger asChild>
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <FaMessage />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Request Image or Send a Message</SheetTitle>
          <SheetDescription>
            Fill in the details below and send your request.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message or Image Request"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            type="submit"
            onClick={handleSend}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Sending..." : "Send Request"} {/* Show loading text */}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RequestSheet;
