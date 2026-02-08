"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { Input } from "../ui/input";
import { useState } from "react";
import { revalidate } from "@/utils/revalidateTag";

type Props = {
  id: string; // REQUIRED
  title?: string;
  trigger: React.ReactNode;
};

export default function DeleteButton({ id, title, trigger }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!text.trim()) {
      toast.error("Please enter cancel reason");
      return;
    }

    try {
      setLoading(true);

      const res = await myFetch(`/appointments/update/${id}`, {
        method: "PATCH",
        body: {
          status: "Cancelled",
          cancelReason: text,
        },
      });

      if (res?.success) {
        toast.success("Cancelled successfully");
        await revalidate("status");
      } else {
        toast.error((res as any)?.error[0].message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Modal */}
      <DialogContent className="bg-gray-500/40 backdrop-blur-sm text-white p-6 rounded-lg text-center border border-white/10 shadow-lg w-[24vw]">
        <h2 className="text-lg font-semibold mb-6">
          {title ? (
            <>
              Are You Sure You Want To Delete <br /> Whatsapp Link?
            </>
          ) : (
            <>Are You Sure You Want To Cancel The Appointment?</>
          )}
        </h2>

        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type cancel reason"
          maxLength={80}
        />

        <div className="flex gap-4 mt-6">
          <DialogClose asChild>
            <Button className="w-1/2 btn">No</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              className="w-1/2  bg-red-600 hover:bg-red-600"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Processing..." : "Yes"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
