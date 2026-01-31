"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from "react";
import { revalidate } from "@/utils/revalidateTag";
import countryListData from "country-list-with-dial-code-and-flag";

type FormData = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
};

export default function AddEmployeeForm({
  workerData,
  trigger,
}: {
  workerData?: any;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const countryList = countryListData.getAll();

  // 🔹 Split phone for edit mode
  const splitPhone = (phone = "") => {
    const match = phone.match(/^(\+\d{1,4})(\d+)$/);
    return {
      countryCode: match?.[1] || "+880",
      phone: match?.[2] || "",
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+880",
      phone: "",
      address: "",
    },
  });

  // 🔹 Reset form on edit
  useEffect(() => {
    if (workerData) {
      const { countryCode, phone } = splitPhone(workerData.phone);

      reset({
        name: workerData.name || "",
        email: workerData.email || "",
        countryCode,
        phone,
        address: workerData.address || "",
      });
    }
  }, [workerData, reset]);

  const onSubmit = async (data: FormData) => {
    const method = workerData?._id ? "PATCH" : "POST";
    const url = workerData?._id
      ? `/workers/update/${workerData._id}`
      : "/workers/create";

    // 🔹 Clean phone number
    const cleanedPhone = data.phone.replace(/^0+/, "");

    const payload = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: `${data.countryCode}${cleanedPhone}`,
    };

    try {
      const res = await myFetch(url, {
        method,
        body: payload,
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("shift-plan");
        setOpen(false);
        reset();
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="rounded-xl w-[36vw] bg-[#3C4751] backdrop-blur-sm opacity-90 border border-gray-400/30 shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white space-y-5"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Employee Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Full name"
              />
              {errors.name && (
                <span className="text-red-400 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Label className="mb-1">Email Address</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Phone + Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Contact Number</Label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode", {
                    required: "Country code required",
                  })}
                  className="text-white rounded px-2 min-w-[100px] border"
                >
                  {countryList.map((item: any, index: number) => (
                    <option
                      key={index}
                      value={item.dial_code}
                      className="bg-[#3C4751]"
                    >
                      {item.flag} {item.dial_code}
                    </option>
                  ))}
                </select>

                <Input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number required",
                    pattern: {
                      value: /^[0-9]{6,14}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  placeholder="Phone number"
                />
              </div>

              {(errors.countryCode || errors.phone) && (
                <span className="text-red-400 text-xs">
                  {errors.countryCode?.message || errors.phone?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="mb-1">Address</Label>
              <Input
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
              />
              {errors.address && (
                <span className="text-red-400 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" className="w-[50%] custom-btn">
              {workerData?._id ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
