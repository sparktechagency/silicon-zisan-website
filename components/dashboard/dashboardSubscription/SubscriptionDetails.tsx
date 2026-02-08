import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

export default function SubscriptionDetails({
  bio,
  trigger,
}: {
  bio: string;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer ">{trigger}</DialogTrigger>
      <DialogContent className="w-[30vw]">{bio}</DialogContent>
    </Dialog>
  );
}
