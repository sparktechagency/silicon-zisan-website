import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
        </div>
        <DialogClose>
          <Button className="custom-btn rounded w-full py-2 h-10 text-lg">
            Save
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
