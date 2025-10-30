"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CancelModalProps {
  trigger?: React.ReactNode;
  isModalOneOpen: boolean;
  setIsModalOneOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenSecondModal: () => void;
}

export default function CancelModal({
  trigger,
  isModalOneOpen,
  setIsModalOneOpen,
  onOpenSecondModal,
}: CancelModalProps) {
  const handleClickModalTwo = () => {
    setIsModalOneOpen(false);
    onOpenSecondModal(); // trigger second modal from parent
  };

  return (
    <Dialog open={isModalOneOpen} onOpenChange={setIsModalOneOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-white text-gray-700">
        <div>
          <h1 className="capitalize text-2xl font-medium text-center mt-4">
            Are you sure you want to delete <br /> this plan?
          </h1>

          <div className="flex justify-between gap-4 mt-5">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-red-500 text-white w-1/2 h-12"
              >
                No
              </Button>
            </DialogClose>

            <Button
              onClick={handleClickModalTwo}
              variant="outline"
              className="custom-btn text-white w-1/2 h-12"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
