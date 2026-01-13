"use client";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: data,
      });

      console.log("res", res);

      if (res?.success) {
        toast.success(res?.message);
        router.push(`/verify-otp?email=${data?.email}`);
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full ">
      {/* email */}
      <div>
        <Input
          type="email"
          className="placeholder:text-white text-white"
          placeholder="Enter Your Email Address"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email?.type === "required" && (
        <p className="text-red-500">Email is required</p>
      )}

      <Button className="custom-btn w-full" type="submit">
        Verify
      </Button>
    </form>
  );
}
