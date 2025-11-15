"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Container from "@/share/Container";
import Image from "next/image";
import logo from "../../public/auth/logo.png";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Email is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  // const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log(values);
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

      <div className="w-[80%] md:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
        <h1 className="text-center text-3xl font-semibold text-white pt-3 pb-10">
          Sign Up
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full "
          >
            {/* full name */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-white text-white"
                      placeholder="Enter Your Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-white text-white"
                      placeholder="Enter Your Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-white"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-white"
                      placeholder="Enter Your Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/login">
              <Button className="custom-btn w-full" type="submit">
                Sign Up
              </Button>
            </Link>

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
        </Form>
      </div>
    </Container>
  );
}
