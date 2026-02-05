"use client";
import { Switch } from "@/components/ui/switch";
import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import { setCookie } from "cookies-next/client";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TwoFactorAuth({ getProfile }: any) {
  const [smsActive, setSmsActive] = useState(
    Boolean(getProfile?.authentication?.is2FAEmailActive),
  );
  const [authAppActive, setAuthAppActive] = useState(
    Boolean(getProfile?.authentication?.is2FAAuthenticatorActive),
  );
  const router = useRouter();

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
        toast.success(
          `Email verify otp is ${value ? "on" : "of"} successfully`,
        );
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };
  const handleActiveIsActive2 = async (value: boolean) => {
    // ❌ User is trying to TURN ON → go to setup flow
    if (value === true) {
      // handleAuthentication(); // generate QR + redirect
      toast.error("Please click Authenticator App");
      return;
    }

    // ✅ User is turning OFF → update backend
    try {
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: {
          is2FAAuthenticatorActive: false,
        },
      });

      if (res.success) {
        toast.success("Google Authenticator App is   Closed");
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Update failed");
        setAuthAppActive(true); // rollback UI
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setAuthAppActive(true); // rollback UI
    }
  };

  return (
    <Container className="px-10 md:px-40  space-y-6 my-16">
      <div className="flex gap-2">
        <div>
          <button
            className="bg-card rounded-full button-unactive w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => router.back()}
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
            <p className="text-sm">{smsActive ? "Active" : "Inactive"}</p>
            <p className="text-base font-medium">Email</p>
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
            <p className="text-sm">{authAppActive ? "Active" : "Inactive"}</p>
            <p className="text-base font-medium">Google Authenticator App</p>
          </div>
          <Switch
            checked={authAppActive}
            onCheckedChange={(checked) => {
              // Optimistic UI only for OFF
              if (!checked) {
                setAuthAppActive(false);
              }

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
