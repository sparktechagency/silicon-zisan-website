"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { revalidate } from "@/utils/revalidateTag";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  address: string;
  phone: string;
  businessCategory: string;
  legalForm: string;
  taxNo: string;
  deNo: string;
  whatsApp: string;
  about: string;
};

export default function EditProfile({
  title,
  initialData,
}: {
  title?: string;
  initialData?: any;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<Inputs>({
    defaultValues: {
      name: initialData?.user?.name || "",
      address: initialData?.user?.address || "",
      phone: initialData?.user?.phone || "",
      legalForm: initialData?.legalForm || "",
      taxNo: initialData?.taxNo || "",
      deNo: initialData?.deNo || "",
      whatsApp: initialData?.whatsApp || "", // for whatsapp update page
      about: initialData?.about || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData?.user?.name || "",
        address: initialData?.user?.address || "",
        phone: initialData?.user?.phone || "",
        legalForm: initialData?.legalForm || "",
        taxNo: initialData?.taxNo || "",
        deNo: initialData?.deNo || "",
        whatsApp: initialData?.whatsApp || "", // for whatsapp update page
        about: initialData?.about || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await myFetch("/employers/profile", {
        method: "PATCH",
        body: values,
      });

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
        window.location.reload();
        await revalidate("profile");
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          placeholder="Company Name"
          className="placeholder:text-gray-400"
          {...register("name")}
        />

        <Input
          placeholder="Legal Form"
          className="placeholder:text-gray-400"
          {...register("legalForm")}
        />

        <Input
          placeholder="Address"
          className="placeholder:text-gray-400"
          {...register("address")}
        />

        <Input
          placeholder="Phone Number"
          className="placeholder:text-gray-400"
          {...register("phone")}
        />

        <Input
          placeholder="Tax Number"
          className="placeholder:text-gray-400"
          {...register("taxNo")}
        />

        <Input
          placeholder="DE Number"
          className="placeholder:text-gray-400"
          {...register("deNo")}
        />

        <Input
          placeholder="WhatsApp Number"
          className="placeholder:text-gray-400"
          {...register("whatsApp")}
        />

        <Input
          placeholder="About Company"
          className="placeholder:text-gray-400"
          {...register("about")}
        />

        <Button type="submit" className="w-full custom-btn">
          Confirm
        </Button>
      </form>
    </div>
  );
}
