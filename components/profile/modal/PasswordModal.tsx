"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function PasswordModal({ open, onOpenChange }: any) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await myFetch("/auth/change-password", {
        method: "POST",
        body: values,
      });

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
        onOpenChange(false);
      } else {
        toast.error(
          (res as any)?.error[0].message || "Failed to update profile",
        );
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>{trigger}</DialogTrigger> */}

      <DialogContent className="sm:max-w-xl bg-[#3C4751] rounded-lg p-6 w-full max-w-md shadow-lg opacity-80 backdrop-blur-sm border border-white/22">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          {/* Current Password */}
          <div>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="pr-10"
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrent ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>
          {/* New Password */}
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showNew ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <Button type="submit" className="w-full custom-btn">
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
