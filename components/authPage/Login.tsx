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
import Link from "next/link";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Email is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full "
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
            Login
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
        <p className="text-center text-white mt-8">
          Don't Have An Account?{" "}
          <Link className="underline" href="/method">
            SignUp
          </Link>
        </p>
      </form>
    </Form>
  );
}
