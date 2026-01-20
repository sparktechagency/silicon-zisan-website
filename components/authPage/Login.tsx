"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaApple, FaGoogle } from "react-icons/fa";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch("/auth/login", {
        method: "POST",
        body: data,
      });

      if (res?.success) {
        toast.success(res?.message);
        if (res?.data?.accessToken) {
          setCookie("accessToken", res?.data?.accessToken);
          setCookie("role", res?.data?.role);
          router.push("/");
        } else {
          router.push("/verify-otp");
        }
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
      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className="placeholder:text-white"
          placeholder="Enter Your Password"
          {...register("password", { required: true })}
        />

        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#374859]"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </span>
      </div>
      {errors.password?.type === "required" && (
        <p className="text-red-500">Password is required</p>
      )}

      <Button className="custom-btn w-full" type="submit">
        Login
      </Button>
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-white underline ">
          Forgot Password?
        </Link>
      </div>
      <p className="text-center my-4">Or Continue With</p>
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          className="px-8! bg-white text-[#2C3E50] hover:text-[#0288A6]"
        >
          <FaGoogle />
        </Button>
        <Button
          type="button"
          className="px-8! bg-white text-[#2C3E50] hover:text-[#0288A6]"
        >
          <FaApple />
        </Button>
      </div>
      <p className="text-center text-white mt-8">
        Don&apos;t Have An Account?{" "}
        <Link className="underline" href="/signup">
          SignUp
        </Link>
      </p>
    </form>
  );
}
