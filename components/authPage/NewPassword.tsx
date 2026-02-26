"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};

export default function NewPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch("/auth/reset-password", {
        method: "POST",
        body: {
          newPassword: data?.newPassword,
          confirmPassword: data?.confirmPassword,
        },
        token: token,
      });

      if (res?.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res?.message || "Failed to reset password");
      }
    } catch (err) {
      // handle error
      toast.error(
        err instanceof Error
          ? err.message
          : "Password reset failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full ">
      {/* password */}
      <Input
        className="placeholder:text-white text-white"
        placeholder="Enter Your New Password"
        {...register("newPassword")}
        type="password"
      />

      {/*new Password */}

      <Input
        className="placeholder:text-white text-white"
        placeholder="Enter Your Confirm Password"
        {...register("confirmPassword")}
        type="password"
      />

      <Button className="custom-btn w-full" type="submit">
        Submit
      </Button>
    </form>
  );
}
