"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "../ui/button";

export function VerifyOtp() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-[80%] lg:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859] text-center mx-auto">
      <h1 className="text-center text-xl sm:text-3xl font-semibold text-white pt-3 pb-2">
        Verify OTP
      </h1>
      <p className="text-white">we will sent the OTP to your email</p>
      <div className="flex items-center justify-center mt-6">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center text-sm text-white my-5 cursor-pointer">
        Resend
      </div>

      <Link href="/new-password">
        <Button className="custom-btn w-[80%]" type="submit">
          Continue
        </Button>
      </Link>
    </div>
  );
}
