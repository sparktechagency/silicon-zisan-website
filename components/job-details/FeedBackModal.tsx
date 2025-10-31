import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import feedback from "../../public/dashboard/feedback.png";
import Image from "next/image";
import { Label } from "../ui/label";

export default function FeedBackModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="cursor-pointer border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#0F172A] transition">
          Feedback
        </button>
      </DialogTrigger>
      <DialogContent className=" text-white bg-[#3C4751] rounded-lg p-6 w-full sm:max-w-xl shadow-lg opacity-90 border border-gray-400/40">
        <div>
          <h1 className="text-white text-2xl xl:text-[28px]">
            Give Your Feedback
          </h1>
          <Image src={feedback} alt="feedback" className="w-52" />
          <form>
            <Label className="mt-4 text-xl">Review</Label>
            <Textarea
              className=" h-40 placeholder:text-white mt-3"
              placeholder="Type Your Review"
            />
            <Button className="custom-btn w-full my-4">Submit</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
