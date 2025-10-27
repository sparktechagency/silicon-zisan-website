import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Phonenumber() {
  return (
    <div className="max-w-xl mx-auto my-10 bg-card rounded-lg p-6 w-full shadow-lg opacity-80 border border-gray-400/30 z-50">
      <h1 className="text-2xl font-semibold text-white">Mobile Number</h1>
      <Input placeholder="Enter your number" className="mt-2 mb-4" />

      <Link href="/verify-otp-phone-number">
        <Button type="button" className="w-full custom-btn h-12">
          Continue
        </Button>
      </Link>
    </div>
  );
}
