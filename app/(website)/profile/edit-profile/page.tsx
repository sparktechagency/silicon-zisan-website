"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { revalidate } from "@/utils/revalidateTag";
import { Label } from "@/components/ui/label";
import AddressInput from "@/components/profile/AddressSearch";
import { useRouter } from "next/navigation";
import { error } from "console";

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
  location: [];
};

type ProfileData = {
  user?: {
    name: string;
    address: string;
    phone: string;
  };
  legalForm?: string;
  taxNo?: string;
  deNo?: string;
  whatsApp?: string;
  about?: string;
};

export default function EditProfile({ title }: { title?: string }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await myFetch("/employers/me", {
        tags: ["profile"],
      });

      setInitialData(profileData?.data);
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
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
      location: [],
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
    if (!values.name || !values.legalForm || !values.address) {
      toast.error("Please select name, legal form, and address");
      return;
    }

    setLoading(true);
    try {
      const res = await myFetch("/employers/profile", {
        method: "PATCH",
        body: values,
      });

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
        await revalidate("profile");
        router.push("/profile");
      } else {
        toast.error(
          (res as any)?.error[0].message || "Failed to update profile",
        );
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2f4054] p-6 rounded-lg border border-gray-400/30 w-full max-h-[63vh] overflow-y-scroll ">
      {/* Header with Back Arrow */}
      <div className="flex items-center mb-6 space-x-3">
        <h2 className="text-lg font-semibold">
          {title ? "Complete Profile" : "Edit Profile"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            placeholder="Enter company name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-400 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="legalForm">Legal Form</Label>

          <Input
            id="legalForm"
            placeholder="Enter legal form"
            {...register("legalForm", {
              required: "Legal form is required",
            })}
          />

          {errors.legalForm && (
            <span className="text-red-400 text-sm">
              {errors.legalForm.message}
            </span>
          )}
        </div>

        {/* 
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter address"
            {...register("address")}
          />
        </div> */}

        <AddressInput setValue={setValue} register={register} errors={errors} />

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxNo">Tax Number</Label>
          <Input
            id="taxNo"
            placeholder="Enter tax number"
            {...register("taxNo")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deNo">DE Number</Label>
          <Input
            id="deNo"
            placeholder="Enter DE number"
            {...register("deNo")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsApp">WhatsApp Number</Label>
          <Input
            id="whatsApp"
            placeholder="Enter WhatsApp number"
            {...register("whatsApp")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">About Company</Label>
          <Input
            id="about"
            placeholder="Short description about company"
            {...register("about")}
          />
        </div>

        <Button disabled={loading} type="submit" className="w-full custom-btn">
          Confirm
        </Button>
      </form>
    </div>
  );
}
