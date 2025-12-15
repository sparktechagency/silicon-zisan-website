"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  legalFrom: z.string().min(1, { message: "Legal From is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  contactNumber: z.string().min(1, { message: "Phone is required" }),
  companyCategory: z
    .string()
    .min(1, { message: "Comapany Category is required" }),
  taxNo: z.string().min(1, { message: "Tax No is required" }),
  deNo: z.string().min(1, { message: "DeNo No is required" }),
  optionalField: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditProfile({ title }: { title?: string }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {};

  return (
    <div className="bg-[#2f4054] p-6 rounded-lg border border-gray-400/30 w-full">
      {/* Header with Back Arrow */}
      <div className="flex items-center mb-6 space-x-3">
        <h2 className="text-lg font-semibold">
          {title ? "Complete Profile" : "Edit Profile"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Legal From */}
          <FormField
            control={form.control}
            name="legalFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal From</FormLabel>
                <FormControl>
                  <Input placeholder="Type Here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Category */}
          <FormField
            control={form.control}
            name="companyCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Category</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full border" {...field}>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tax No */}
          <FormField
            control={form.control}
            name="taxNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Tax No" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* De No */}
          <FormField
            control={form.control}
            name="deNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>De No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter De No" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Optional Field */}
          <FormField
            control={form.control}
            name="optionalField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Here (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Type Here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Button */}
          <Button type="submit" className="w-full custom-btn">
            Confirm
          </Button>
        </form>
      </Form>
    </div>
  );
}
