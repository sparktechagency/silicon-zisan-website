"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTag";
import { useState } from "react";
import { toast } from "sonner";

export function SubscriptionCancelModal({ subscriptionId }: any) {
  const [open, setOpen] = useState(false);

  const handleSubscription = async (id: string) => {
    try {
      const res = await myFetch(`/subscriptions/cancel/${id}`, {
        method: "PATCH",
      });

      if (res.success) {
        toast.success("Subscription cancelled successfully");
        await revalidate("subscription");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
          Cancel Subscription
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm rounded-xl p-6 bg-card text-white border-none">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold text-white">
            Cancel Subscription
          </DialogTitle>
          <DialogDescription className="mt-2 text-md text-gray-300">
            Are you sure you want to cancel this subscription?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex justify-between">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-white border-gray-500 hover:bg-gray-700 w-28"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white w-28"
            onClick={() => handleSubscription(subscriptionId)}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
