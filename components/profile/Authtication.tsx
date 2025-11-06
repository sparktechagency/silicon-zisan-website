"use client";
import { Switch } from "@/components/ui/switch";
import Container from "@/share/Container";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function TwoFactorAuth() {
  const [smsActive, setSmsActive] = useState(true);
  const [authAppActive, setAuthAppActive] = useState(false);
  const router = useRouter();

  return (
    <Container className="px-10 md:px-40  space-y-6 my-16">
      <div className="flex gap-2">
        <div>
          <button
            className="bg-card rounded-full button-unactive w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <ArrowLeft />
          </button>
        </div>
        <h2 className="text-xl font-semibold">2 Factor Authentication</h2>
      </div>

      <div className="space-y-2">
        <div>
          <Link href="/phone-number-sms">
            <button className="w-full border border-white rounded-full py-2 text-white cursor-pointer">
              Sms
            </button>
          </Link>
        </div>
        <div>
          <Link href="/authentication-app">
            <button className="w-full border border-white rounded-full py-2 text-white cursor-pointer">
              Authenticator App
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-card px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm">Active</p>
            <p className="text-base font-medium">01839327833</p>
          </div>
          <Switch checked={smsActive} onCheckedChange={setSmsActive} />
        </div>

        <div className="flex items-center justify-between bg-card px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm">Inactive</p>
            <p className="text-base font-medium">Google Authenticator App</p>
          </div>
          <Switch checked={authAppActive} onCheckedChange={setAuthAppActive} />
        </div>
      </div>

      <div className="pt-4 ">
        <p className="text-sm font-semibold flex items-center gap-2">
          <span>
            <Info />
          </span>{" "}
          Third Party Apps
        </p>
        <p className="text-xs text-white/70 mt-1">
          Third Party Apps Don’t Have Control Of Your Account.
        </p>
      </div>
    </Container>
  );
}
