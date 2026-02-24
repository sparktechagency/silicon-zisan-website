"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomBackButton from "@/share/CustomBackButton";

export function VerifyOtpphoneNumber() {
  const [value, setValue] = React.useState("");

  return (
    <div className="py-8 w-[80%] lg:w-[50%] mx-auto">
      {/* <div className="w-[40%] mx-auto px-4 py-10">
      
        <div className=" border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859] text-center mt-3">
          <h1 className="text-center text-3xl font-semibold text-white pt-3 pb-2">
            Verify OTP
          </h1>
          <p className="text-white">we will sent the OTP to your phone</p>
          <div className="space-y-2 flex items-center justify-center mt-6">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
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
         
          </div>

          <Link href="/factor-authenticaiton">
            <Button className="custom-btn w-[80%] h-12" type="submit">
              Continue
            </Button>
          </Link>
        </div>
      </div> */}
      <CustomBackButton />
      <div className="border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859] text-center mx-auto mt-4">
        <h1 className="text-center text-xl sm:text-3xl font-semibold text-white pt-3 pb-2">
          Verify OTP
        </h1>
        <p className="text-white">We have sent the OTP to your phone number </p>
        <div className="flex items-center justify-center mt-6">
          {/* <InputOTP
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
          </InputOTP> */}
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[...Array(5)].map((_, i) => (
                <InputOTPSlot className="notranslate" key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* <div className="text-center text-sm text-white my-5 cursor-pointer">
          Resend
        </div> */}

        <div className="mt-4">
          <Link href="/factor-authenticaiton">
            <Button className="custom-btn w-[200px] md:w-[420px]" type="submit">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
