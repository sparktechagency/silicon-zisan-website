"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { SearchableCountrySelect } from "@/helper/CountryCodeSearch";
import countryListData from "country-list-with-dial-code-and-flag";
import { revalidate } from "@/utils/revalidateTag";

type Inputs = {
  whatsApp: string;
  countryCode: string;
};

export default function AddWhatsLink({ whatsApp }: { whatsApp: string }) {
  const countryList = countryListData.getAll();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,

    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { whatsApp: whatsApp || "" },
  });

  // const cleanedPhone = whatsApp.replace(/^0+/, "");

  useEffect(() => {
    reset({ whatsApp });
  }, [whatsApp, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const { countryCode, ...rest } = data;
    const cleanPhone = data.whatsApp.replace(/^0+/, "");
    const formattedPhone = countryCode
      ? `${countryCode}${cleanPhone}`
      : cleanPhone;

    const payload = {
      ...rest,
      whatsApp: formattedPhone,
    };

    try {
      const res = await myFetch(`/employers/me`, {
        method: "PATCH",
        body: payload,
      });

      if (res.success) {
        toast.success("Number is updated Successfully");
        revalidate("whatsapp");
        reset();
        // window.location.reload();
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded">
      <h1 className="text-xl">WhatsApp Number</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          {/* <Input
            {...register("whatsApp", {
              required: "Phone number is required",
            })}
            type="tel"
            placeholder="Enter Number Here"
            className="border"
          /> */}

          <div className="flex gap-2">
            <SearchableCountrySelect
              value={watch("countryCode")}
              onChange={(dialCode: string) => {
                setValue("countryCode", dialCode, { shouldDirty: true });
              }}
              error={errors.countryCode}
              countryList={countryList}
            />

            <Input
              type="tel"
              {...register("whatsApp", {
                required: "Phone number required",
                // pattern: {
                //   value: /^[0-9]{6,14}$/,
                //   message: "Invalid phone number",
                // },
              })}
              placeholder="Phone number"
            />
          </div>

          {errors.whatsApp && (
            <p className="text-red-500 text-sm">{errors.whatsApp.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button disabled={loading} className="custom-btn h-12 text-xl mt-3">
            Update Number
          </Button>
        </div>
      </form>
    </div>
  );
}
