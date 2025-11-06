import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Trash2 } from "lucide-react";

const people = [
  "Kamran Khan",
  "Ayesha Rahman",
  "Nabil Chowdhury",
  "Farhana Islam",
];

export default function DeleteModalUsers({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className=" border border-gray-400/30 ">
        <div className="mt-10">
          {people.map((person, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-gray-400 rounded"
            >
              <p className="my-2  p-2 ">{person}</p>
              <button className="my-2  p-2">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* <div>
          <h1 className="text-white text-xl capitalize text-center">
            are you sure you want to Delete This <br /> Plan?
          </h1>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                className="w-[50%] bg-red-500 border-none"
                variant="outline"
              >
                No
              </Button>
            </DialogClose>
            <Button className="custom-btn w-[50%]" type="submit">
              Yes
            </Button>
          </DialogFooter>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
