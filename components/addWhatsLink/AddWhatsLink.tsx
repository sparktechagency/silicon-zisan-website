"use client";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

type Inputs = {
  whatsApp: string;
};

export default function AddWhatsLink({ whatsApp }: { whatsApp: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { whatsApp: whatsApp || "" },
  });

  useEffect(() => {
    reset({ whatsApp });
  }, [whatsApp, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
<<<<<<< HEAD
    //console.log("Submitted phone:", data.phone);

=======
>>>>>>> ceb4b5c532f5ba14580cf7549592cb374d37f855
    try {
      const res = await myFetch(`/employers/me`, {
        method: "PATCH",
        body: data,
      });
<<<<<<< HEAD
      //console.log("res", res);
=======

      if (res.success) {
        toast.success("Number is updated Successfully");
      } else {
        toast.error((res as any)?.error[0].message);
      }
>>>>>>> ceb4b5c532f5ba14580cf7549592cb374d37f855
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
            {...register("whatsApp", {
              required: "Phone number is required",
            })}
            type="tel"
            placeholder="Enter Number Here"
            className="border"
          />
          {errors.whatsApp && (
            <p className="text-red-500 text-sm">{errors.whatsApp.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button className="custom-btn h-12 text-xl mt-3">Add</Button>
        </div>
      </form>
    </div>
  );
}
