"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { myFetch } from "@/utils/myFetch";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "cookies-next/client";

export function AuthenticationVerify() {
  const [otp, setOtp] = React.useState("");
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const id = searchParams.get("userId") || "";

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const payload = { userId: id, otp: otp };

    try {
      const res = await myFetch("/totp/verify-token", {
        method: "POST",
        body: payload,
      });

      console.log("res ===>>", res);

      if (res?.success) {
        toast.success("Authentication Successfully");
        if (res?.data?.accessToken) {
          setCookie("accessToken", res?.data?.accessToken);
        }
        if (res?.data?.role) {
          setCookie("role", res?.data?.role);
        }
        window.location.assign(callbackUrl);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <div className="w-[80%] lg:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859] text-center mx-auto">
      <h1 className="text-xl sm:text-3xl font-semibold text-white">
        Authentication OTP
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

        {/* <div
          className="text-center text-sm text-white my-5 cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend
        </div> */}

        <Button className="custom-btn w-[80%] mt-6" type="submit">
          Continue
        </Button>
      </form>
    </div>
  );
}
