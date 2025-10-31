// components/EmailModal.tsx
"use client";
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
import { use, useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export function EmailModal({ trigger }: { trigger: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailSubmit = () => {
    // Handle email submission logic here
    router.push(`/alert-setting`);
  };

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
          <Button onClick={handleEmailSubmit} className="w-full custom-btn">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
