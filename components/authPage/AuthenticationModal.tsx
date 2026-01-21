"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { getCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";

interface AuthenticationModalProps {
  open: boolean;
  onClose: () => void;
}

type Inputs = {
  userId: string;
  otp: string;
};

export default function AuthenticationModal({
  open,
  onClose,
}: AuthenticationModalProps) {
  const [isActive, setIsActive] = useState("");
  const searchParams = useSearchParams();

  const email = getCookie("email");

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
        toast.success(res.message);
        onClose(); // close the modal after success
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "someting went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="border-none">
        <div className="grid grid-cols-2 gap-9 mt-7">
          <Button
            onClick={() => setIsActive("email")}
            className={`bg-[#374859] border ${isActive === "email" && "custom-btn"}`}
          >
            Email
          </Button>
          <Button
            onClick={() => setIsActive("auth")}
            className={`bg-[#374859] border ${isActive === "auth" && "custom-btn"}`}
          >
            Authentication
          </Button>
        </div>

        {isActive && (
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Enter Your OTP" {...register("otp")} />
            <Button className="custom-btn mt-7 w-full">Submit</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
