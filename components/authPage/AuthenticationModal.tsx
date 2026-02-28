"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const url =
      isActive === "email" ? "/auth/verify-email" : "/totp/verify-token";

    const payload = {
      userId: userId,
      otp: data.otp,
    };

    const payload2 = {
      email: email,
      oneTimeCode: Number(data.otp),
    };

    try {
      const res = await myFetch(url, {
        method: "POST",
        body: isActive === "email" ? payload2 : payload,
      });

      if (res.success) {
        toast.success("Authentication Successfully");
        setCookie("accessToken", res?.data?.accessToken);
        onClose();
        router.push(callbackUrl);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handle2FA();
  }, [handle2FA]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="border-none w-[98vw] md:w-[28vw]">
        <div className="grid grid-cols-2 gap-3 md:gap-9 mt-7">
          <Button
            disabled={!data?.is2FAEmail}
            onClick={handle2FA}
            className={`bg-[#374859] border ${
              isActive === "email" ? "custom-btn" : ""
            }`}
          >
            Email
          </Button>

          <Button
            disabled={!data?.is2FAAppActive}
            onClick={handle2FA}
            className={`bg-[#374859] border ${
              isActive === "auth" ? "custom-btn" : ""
            }`}
          >
            Authentication
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
