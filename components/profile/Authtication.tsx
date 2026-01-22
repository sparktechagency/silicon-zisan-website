"use client";
import { Switch } from "@/components/ui/switch";
import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import { setCookie } from "cookies-next/client";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TwoFactorAuth() {
  const [smsActive, setSmsActive] = useState(false);
  const [authAppActive, setAuthAppActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await myFetch("/users/profile");

        if (res?.success) {
          // ✅ sync backend value to Switch
          setSmsActive(Boolean(res.data?.authentication?.is2FAEmailActive));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleAuthentication = async () => {
    try {
      const res = await myFetch("/totp/generate-token", {
        method: "POST",
      });

      if (res.success) {
        setCookie("qrcode", res?.data?.qrcode);
        router.push(`/authentication-app`);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleActiveIsActive = async (value: boolean) => {
    try {
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: {
          is2FAEmailActive: value, // true | false
        },
      });

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleActiveIsActive2 = async (value: boolean) => {
    console.log("value", value);

    try {
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: {
          is2FAAuthenticatorActive: value, // true | false
        },
      });

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

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
          <button
            onClick={handleAuthentication}
            className="w-full border border-white rounded-full py-2 text-white cursor-pointer"
          >
            Authenticator App
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-card px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm">Active</p>
            <p className="text-base font-medium">01839327833</p>
          </div>
          <Switch
            checked={smsActive}
            onCheckedChange={(checked) => {
              setSmsActive(checked);
              handleActiveIsActive(checked);
            }}
          />
        </div>

        <div className="flex items-center justify-between bg-card px-4 py-3 rounded-lg">
          <div>
            <p className="text-sm">Inactive</p>
            <p className="text-base font-medium">Google Authenticator App</p>
          </div>
          <Switch
            checked={authAppActive}
            onCheckedChange={(checked) => {
              setAuthAppActive(checked);
              handleActiveIsActive2(checked);
            }}
          />
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
