// components/EmailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function EmailModal({ trigger }: { trigger: React.ReactNode }) {
  const [email, setEmail] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm bg-card text-white rounded-md opacity-90">
        <DialogHeader>
          <DialogTitle className="text-lg text-white">
            Email Address
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" border border-white/20"
        />

        <DialogFooter>
          <Button className="w-full custom-btn">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
