"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCookie } from "cookies-next/client";
import Image from "next/image";

export default function AuthenticationApp() {
  const qrcode = getCookie("qrcode");

  return (
    <div className="bg-card text-white p-6 max-w-xl my-16 mx-auto rounded-lg space-y-6 border border-gray-400/30">
      <div className="text-xl font-semibold gap-3 flex items-center">
        <button
          className="bg-card button-unactive rounded-full p-1 h-9 w-9 flex items-center justify-center"
          onClick={() => history.back()}
        >
          <ArrowLeft />
        </button>
        <h1>Set Your Authentication App</h1>
      </div>

      <p className="text-sm text-white/80">
        Authenticator App provides you a Security Code. With that code, you can
        secure your account.
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">1. Step One</h3>
          <p className="text-sm text-white/70">
            Please download an Authenticator App like Google Authenticator or
            Microsoft Authenticator.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">2. Step Two</h3>
          <p className="text-sm text-white/70">
            Please open the Authenticator App and scan this QR code.
          </p>

          <div className="mt-2 rounded-md w-fit mx-auto p-2">
            <Image
              src={qrcode as string}
              alt="QR Code"
              width={200}
              height={300}
              className="w-60 h-60 object-cover"
              // unoptimized
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">3. Step Three: Enter Code</h3>
          <p className="text-sm text-white/70">
            Please enter the code from your Authenticator App to complete this
            verification.
          </p>

          <Input
            placeholder="Enter Your Code"
            className="mt-2 bg-[#4B5A69] text-white border-white/20"
          />
        </div>
      </div>

      <Link href="/factor-authenticaiton">
        <Button className="w-full custom-btn h-12 mt-4">Confirm</Button>
      </Link>
    </div>
  );
}
