"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Container from "@/share/Container";
import Image from "next/image";
import logo from "../../public/auth/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";

export function VerifyOtp() {
  const [value, setValue] = React.useState("");

  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 px-4 py-10">
      {/* logo */}
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[32%] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5">
        <Image src={logo} alt="Logo" width={100} height={24} />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[18px] font-medium">
          WHERE DREAM JOB MEETS TOP TALENT
        </h1>
      </div>

      <div className="w-[50%] border border-[##FFFFFF0D] p-8 rounded-md bg-[#374859] text-center">
        <h1 className="text-center text-3xl font-semibold text-white pt-3 pb-2">
          Verify OTP
        </h1>
        <p className="text-white">we will sent the OTP to your email</p>
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
          Resend
        </div>

        <Link href="/new-password">
          <Button className="custom-btn w-[80%]" type="submit">
            Continue
          </Button>
        </Link>
      </div>
    </Container>
  );
}
