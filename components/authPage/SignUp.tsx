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

const formSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Email is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log(values);
  };

  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 px-4 py-10">
      {/* logo */}
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[32%] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5">
        <Image src={logo} alt="Logo" width={100} height={24} />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[18px] font-medium">
          WHERE DREAM JOB MEETS TOP TALENT
        </h1>
      </div>

      <div className="w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/forgot-password">
              <Button className="custom-btn w-full" type="submit">
                Submit
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </Container>
  );
}
