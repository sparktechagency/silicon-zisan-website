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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  legalForm: z.string().min(1, { message: "Legal Form is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  businessCategory: z
    .string()
    .min(1, { message: "Business Category is required" }),
  taxNo: z.string().min(1, { message: "Tax No is required" }),
  deNo: z.string().min(1, { message: "DeNo is required" }),
  whatsApp: z.string().optional(),
  about: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditProfile({
  title,
  initialData,
}: {
  title?: string;
  initialData?: any;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:
        initialData?.user?.name ||
        initialData?.name ||
        initialData?.user?.id ||
        "",
      legalForm: initialData?.legalForm || "",
      address: initialData?.user?.address || initialData?.address || "",
      phone: initialData?.user?.phone || initialData?.contactNumber || "",
      businessCategory: initialData?.businessCategory || "",
      taxNo: initialData?.taxNo || "",
      deNo: initialData?.deNo || "",
      whatsApp: initialData?.whatsApp || "",
      about: initialData?.about || "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const res = await myFetch("/employers/profile", {
        method: "PATCH",
        body: values,
      });

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

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
            name="name"
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

          {/* Legal Form */}
          <FormField
            control={form.control}
            name="legalForm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal Form</FormLabel>
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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
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

          {/* Business Category */}
          <FormField
            control={form.control}
            name="businessCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full border">
                      <SelectValue placeholder="Select a category" />
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

          {/* WhatsApp */}
          <FormField
            control={form.control}
            name="whatsApp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="Enter WhatsApp Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* About */}
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
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
