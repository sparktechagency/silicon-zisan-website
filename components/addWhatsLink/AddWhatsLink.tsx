"use client";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

type Inputs = {
  phone: string;
};

export default function AddWhatsLink({ phone }: { phone: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { phone: phone || "" },
  });

  useEffect(() => {
    reset({ phone });
  }, [phone, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch(`/users/profile`, {
        method: "PATCH",
        body: data,
      });

      if (res.success) {
        toast.success("Number is updated Successfully");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="rounded">
      <h1 className="text-xl">WhatsApp</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <Input
            {...register("phone", {
              required: "Phone number is required",
            })}
            type="tel"
            placeholder="Enter Number Here"
            className="border"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button className="custom-btn h-12 text-xl mt-3">Add</Button>
        </div>
      </form>
    </div>
  );
}
