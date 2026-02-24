"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PasswordModal from "@/components/profile/modal/PasswordModal";

interface Props {
  trigger: React.ReactNode;
  email: string;
}

export function ChangePasswordOtp({ trigger, email }: Props) {
  const [otp, setOtp] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 🔹 Trigger click handler
  const handleTriggerClick = async () => {
    handleOtp();
    setLoading(true);
    setLoading(false);
    setOpen(true);
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await myFetch("/auth/verify-email", {
        method: "POST",
        body: { email, oneTimeCode: Number(otp) },
      });

      if (res?.success) {
        setOpen(false);
        setOpen2(true);
        setOtp("");
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    try {
      await myFetch("/auth/forget-password", {
        method: "POST",
        body: {
          email: email,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  return (
    <>
      {/* Custom Trigger */}
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {trigger}
      </div>

      {/* Controlled Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl bg-[#3C4751] rounded-lg p-6 w-full max-w-md shadow-lg opacity-80 backdrop-blur-sm border border-white/22">
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold text-white">
              Verify OTP
            </h1>
            <p className="text-white mt-2">
              We sent a 6-digit code to your email
            </p>

            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-center mt-6">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot className="notranslate" key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                disabled={loading}
                className="custom-btn mt-8 w-full"
                type="submit"
              >
                Continue
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <PasswordModal open={open2} onOpenChange={setOpen2} />
    </>
  );
}
