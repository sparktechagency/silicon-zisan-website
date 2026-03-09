"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";

interface AuthenticationModalProps {
  data: any;
  open: boolean;
  onClose: () => void;
}

type Inputs = {
  userId: string;
  otp: string;
};

export default function AuthenticationModal({
  data,
  open,
  onClose,
}: AuthenticationModalProps) {
  const [isActive, setIsActive] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = getCookie("email");

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // const userId = searchParams.get("userId") || "";
  const userId = searchParams.get("userId") || "";

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { otp: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const url =
      isActive === "email" ? "/auth/verify-email" : "/totp/verify-token";

    const payload = {
      userId: userId,
      otp: formData.otp,
    };

    const payload2 = {
      email: email,
      oneTimeCode: Number(formData.otp),
    };

    try {
      const res = await myFetch(url, {
        method: "POST",
        body: isActive === "email" ? payload2 : payload,
      });

      if (res.success) {
        // When verifying OTP, the token might be in res.data, instead of res.data.accessToken
        const tokenToSave =
          typeof res.data === "string" ? res.data : res?.data?.accessToken;

        if (tokenToSave) {
          setCookie("accessToken", tokenToSave);
        }

        router.push(callbackUrl);

        // Also force a reload so the nav bar picks up the new token
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "someting went wrong");
    }
  };

  const handle2FA = useCallback(() => {
    if (data?.is2FAAppActive) {
      setIsActive("auth");
    } else {
      setIsActive("email");
    }
  }, [data]);

  // Auto-trigger when data loads
  useEffect(() => {
    // eslint-disable-next-line
    handle2FA();
  }, [handle2FA]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="border-none w-[95vw] max-w-md rounded-2xl p-6">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7">
          <Button
            disabled={!data?.is2FAEmailActive}
            onClick={() => setIsActive("email")}
            className={`flex-1 bg-[#374859] border text-sm sm:text-base whitespace-nowrap ${
              isActive === "email" ? "custom-btn" : ""
            }`}
          >
            Email
          </Button>

          <Button
            disabled={!data?.is2FAAppActive}
            onClick={() => setIsActive("auth")}
            className={`flex-1 bg-[#374859] border text-sm sm:text-base whitespace-nowrap ${
              isActive === "auth" ? "custom-btn" : ""
            }`}
          >
            Authenticator App
          </Button>
        </div>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Enter Your OTP" {...register("otp")} />
          <Button disabled={!isActive} className="custom-btn mt-7 w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
