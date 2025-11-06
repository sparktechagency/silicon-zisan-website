import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

export default function DeleteModal({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className=" text-white bg-[#3C4751] rounded-lg p-6 w-full max-w-md shadow-lg opacity-90 border border-gray-400/30">
        <div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
