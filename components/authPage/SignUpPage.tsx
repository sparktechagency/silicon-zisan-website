"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/share/Container";
import Image from "next/image";
import logo from "@/public/auth/logo.png";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Label } from "../ui/label";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch("/users/create-user", {
        method: "POST",
        body: { ...data, role: "Employer" },
      });

      if (res?.success) {
        toast.success(res?.message);
        // setCookie("accessToken", res?.data?.accessToken);
        // setCookie("role", role);
        router.push(`/verify-otp?email=${data.email}`);
      } else {
        toast.error(
          Array.isArray(res?.error)
            ? res?.error[0]?.message
            : (res?.error ?? "Login failed"),
        );
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 py-10 ">
      {/* logo */}

      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D] p-5 relative">
        <div
          className="absolute -top-9  lg:-top-52 xl:-top-40 left-0 bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer"
          onClick={() => history.back()}
        >
          <ArrowLeft />
        </div>
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={24}
          className="w-24 md:w-40"
        />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[17px] capitalize">
          where dream job meets top talent
        </h1>
      </div>

      <div className="w-[80%] md:w-[50%] border border-[#FFFFFF0D] p-5 rounded-md bg-[#374859]">
        <h1 className="text-center text-3xl font-semibold text-white pt-3 pb-7">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full ">
          {/* name */}
          <div>
            <Label className="text-lg  mb-1">Name</Label>
            <Input
              type="text"
              className="placeholder:text-white text-white"
              placeholder="Enter Your Name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* email */}
          <div>
            <Label className="text-lg mb-1">Email</Label>
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
            <Label className="text-lg mb-">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="placeholder:text-white"
              placeholder="Enter Your Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#374859] mt-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <Label className="text-lg mb-1">Confirm Password</Label>
            <Input
              type={showPassword2 ? "text" : "password"}
              className="placeholder:text-white"
              placeholder="Enter Your Password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">confirmPassword is required</p>
            )}

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#374859] mt-3"
              onClick={() => setShowPassword2((prev) => !prev)}
            >
              {showPassword2 ? <Eye /> : <EyeOff />}
            </span>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <Input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-white"
              required
            />
            <span>
              By Continuing, You Accept The{" "}
              <a href="#" className="underline font-semibold">
                Privacy Policy
              </a>
              And{" "}
              <a href="#" className="underline font-semibold">
                Terms & Conditions
              </a>{" "}
              of JobsinApp.
            </span>
          </label>

          <Button className="custom-btn w-full" type="submit">
            Sign Up
          </Button>

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
            <Button
              type="button"
              className="px-8! bg-white text-[#2C3E50] hover:text-[#0288A6]"
            >
              <FaFacebookF />
            </Button>
          </div>
          <p className="text-center text-white mt-4">
            Already Have An Account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
