/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { myFetch } from "@/utils/myFetch";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function VerifyOtp() {
  const [otp, setOtp] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const handleVerifyOtp = async (e: React.FormEvent) => {
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
        if (res?.data) {
          // if reset token is available then redirect reset password page
          toast.success(res.message);
          router.push(`/new-password?token=${res?.data}`);
        } else {
          // if not reset token, redirect to login page
          toast.success(res.message);
          router.push(`/login`);
        }
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await myFetch("/auth/resend-otp", {
        method: "POST",
        body: { email },
      });

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="w-[80%] lg:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859] text-center mx-auto">
      <h1 className="text-xl sm:text-3xl font-semibold text-white">
        Verify OTP
      </h1>
      <p className="text-white mt-2">We sent a 6-digit code to your email</p>

      <form onSubmit={handleVerifyOtp}>
        <div className="flex justify-center mt-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div
          className="text-center text-sm text-white my-5 cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend
        </div>

        <Button className="custom-btn w-[80%]" type="submit">
          Continue
        </Button>
      </form>
    </div>
  );
}
