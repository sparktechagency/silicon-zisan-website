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

const formSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Email is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log(values);
  };

  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 px-4 py-10">
      {/* logo */}
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5 relative">
        <div
          className="absolute top-0 left-0 bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer"
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
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[18px] font-medium">
          WHERE DREAM JOB MEETS TOP TALENT
        </h1>
      </div>

      <div className="md:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
        <h1 className="text-center text-3xl font-semibold text-white pt-3 pb-10">
          Log In
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full "
          >
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
                  <Link href="/forgot-password" className="flex justify-end">
                    <span>Forgot Password</span>
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href="/">
              <Button className="custom-btn w-full" type="submit">
                Submit
              </Button>
            </Link>
            <p className="text-center text-white mt-4">
              Dont't have an account ?{" "}
              <Link className="underline" href="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </Container>
  );
}
