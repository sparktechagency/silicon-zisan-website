import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

export default function WhatsAppModal({
  title,
  trigger,
}: {
  title?: string;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-card rounded p-5 border border-gray-300/30">
        <div className=" ">
          <h1 className="capitalize text-2xl font-semibold mb-2">
            {title ? "add whatsapp link" : "Edit Whatsapp Link"}
          </h1>

          <Input placeholder="Enter Whatsapp link" />

          <button className="custom-btn mt-5 rounded w-full py-2">Save</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
