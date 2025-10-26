import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function FeedBackModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="cursor-pointer border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#0F172A] transition">
          Feedback
        </button>
      </DialogTrigger>
      <DialogContent className=" text-white bg-[#3C4751] rounded-lg p-6 w-full max-w-md shadow-lg opacity-80">
        <div>
          <h1 className="text-white text-xl">Give Your FeedBack</h1>
          <form>
            <Textarea
              className="my-5 h-40 placeholder:text-white"
              placeholder="Type Your Review"
            />
            <Button className="custom-btn w-full">Submit</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
