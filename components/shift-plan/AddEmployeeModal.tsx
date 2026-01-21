import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Label } from "../ui/label";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from "react";
import { revalidate } from "@/utils/revalidateTag";

type FormData = {
  name: string;
  email: string;
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: workerData?.name || "",
      email: workerData?.email || "",
      phone: workerData?.phone || "",
      address: workerData?.address || "",
    },
  });

  useEffect(() => {
    if (workerData) {
      reset({
        name: workerData?.name || "",
        email: workerData?.email || "",
        phone: workerData?.phone || "",
        address: workerData?.address || "",
      });
    }
  }, [workerData, reset]);

  const onSubmit = async (data: FormData) => {
    const method = workerData?._id ? "PATCH" : "POST";
    const url = workerData?._id
      ? `/workers/update/${workerData._id}`
      : "/workers/create";
    try {
      const res = await myFetch(url, {
        method,
        body: data,
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("shift-plan");
        setOpen(false);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-xl max-w-sm bg-[#3C4751] backdrop-blur-sm opacity-90 border border-gray-400/30 shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" text-white  space-y-5"
        >
          {/* Employee Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 font-medium">Employee Name</Label>
              <Input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                placeholder="Enter full name"
                className="w-full p-2 rounded text-white placeholder:text-[13px]"
              />
              {errors.name && (
                <span className="text-red-400 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <Label className="block mb-1 font-medium">Email Address</Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter email"
                className="w-full p-2 rounded text-white placeholder:text-[13px]"
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Contact Number */}
            <div>
              <Label className="block mb-1 font-medium">Contact Number</Label>
              <Input
                type="tel"
                {...register("phone", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Enter phone number"
                className="w-full p-2 rounded text-white placeholder:text-[13px]"
              />
              {errors.phone && (
                <span className="text-red-400 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div>
              <Label className="block mb-1 font-medium">Address</Label>
              <Input
                {...register("address", {
                  required: "Address is required",
                })}
                placeholder="Enter address"
                className="w-full p-2 rounded text-white placeholder:text-[13px]"
              />
              {errors.address && (
                <span className="text-red-400 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="w-[50%] custom-btn">
              {workerData?._id ? "Update " : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
