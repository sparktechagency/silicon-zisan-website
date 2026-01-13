import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTag";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteModal({
  trigger,
  id,
}: {
  trigger: React.ReactNode;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await myFetch(`/shift-plans/delete/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("shift-plan");
        setOpen(false);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Button className="custom-btn w-[50%]" onClick={handleDelete}>
              Yes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
