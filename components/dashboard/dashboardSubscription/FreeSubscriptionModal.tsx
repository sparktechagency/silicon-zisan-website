import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export default function FreeSubscriptionModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-gray-500/40 backdrop-blur-sm text-white p-6 rounded-lg  text-center border border-white/10 shadow-lg">
        <h2 className="text-lg font-semibold mb-6">
          <p>
            Are You Want To Free <br /> Subscribe?
          </p>
        </h2>
        <div>
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button
                className="w-[50%] bg-red-600 border-none hover:bg-red-600 cursor-pointer"
                // variant="outline"
              >
                No
              </Button>
            </DialogClose>
            <Button className="w-[50%] btn" type="submit">
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
