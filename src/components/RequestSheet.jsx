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
import { Textarea } from "@/components/ui/textarea"
import { FaMessage } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast"; // Import the toast hook

const RequestSheet = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const { toast } = useToast(); // Initialize the toast
  const [isOpen, setIsOpen] = useState(false); // State to manage sheet visibility

  const handleSend = async () => {

    if (!name || !message) {
      toast({
        variant: "destructive", // Optional: set the variant to "destructive" to indicate an error
        description: "Name and message are required", // Show toast when inputs are empty
      });
      return; // Exit the function early if the input is invalid
    }

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
          description: "Thank you! Your message has been sent.", // Show toast on success
        });
        setName(""); // Clear the form fields after success
        setMessage("");
        setIsOpen(false); // Close the sheet on success
      } else {
        const errorMessage = await res.text(); // Get error message from response
        toast({
          variant: "destructive",
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
        <SheetHeader className="mt-5">
          <SheetTitle>Request Image or Send a Message</SheetTitle>
          <SheetDescription>
            Fill in the details below.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:items-center">
            <Label htmlFor="name" className="md:text-right">
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
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:items-center">
            <Label htmlFor="message" className="md:text-right">
              Message
            </Label>
            <Textarea
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
            {loading ? "Sending..." : "Send"} {/* Show loading text */}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RequestSheet;
