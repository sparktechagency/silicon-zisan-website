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
import { SearchableCountrySelect } from "@/helper/CountryCodeSearch";
import countryListData from "country-list-with-dial-code-and-flag";

import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslatedValue } from "@/hooks/TranslatedValue";
import { useCookie } from "@/hooks/useCookies";

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
  countryCode: string;
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
  businessCategory: string;
};

export default function EditProfile({ title }: { title?: string }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ProfileData | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const countryList = countryListData.getAll();

  const googtrans = useCookie("googtrans");
  const currentLang =
    googtrans
      .replace(/^\/en\//, "")
      .replace(/^en\//, "")
      .replace(/\/$/, "") || "en";

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await myFetch("/employers/me", {
        tags: ["profile"],
      });

      setInitialData(profileData?.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await myFetch("/categories");
        setCategories(data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log("initialData", initialData);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,

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
      businessCategory:
        categories.find((cat) => cat.name === initialData?.businessCategory)
          ?.name || "", // match by name
      location: [],
      countryCode: "",
    },
  });

  useEffect(() => {
    if (initialData && categories.length > 0) {
      reset({
        name: initialData?.user?.name || "",
        address: initialData?.user?.address || "",
        phone: initialData?.user?.phone || "",
        legalForm: initialData?.legalForm || "",
        taxNo: initialData?.taxNo || "",
        deNo: initialData?.deNo || "",
        whatsApp: initialData?.whatsApp || "", // for whatsapp update page
        about: initialData?.about || "",
        businessCategory:
          categories.find((cat) => cat.name === initialData.businessCategory)
            ?.name || "", // match by name
      });
    }
  }, [initialData, reset, categories]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if (!values.name || !values.legalForm || !values.address) {
      toast.error("Please select name, legal form, and address");
      return;
    }
    const { countryCode, ...rest } = values;

    const cleanPhone = values.phone.replace(/^0+/, "");
    const formattedPhone = countryCode
      ? `${countryCode}${cleanPhone}`
      : cleanPhone;

    const payload = {
      ...rest,
      phone: formattedPhone,
    };

    setLoading(true);
    try {
      const res = await myFetch("/employers/profile", {
        method: "PATCH",
        body: payload,
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

        <AddressInput setValue={setValue} register={register} errors={errors} />

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
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
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
              })}
              placeholder="Phone number"
            />
          </div>
          {errors.phone && (
            <span className="text-red-400 text-sm">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <Label className="block text-sm mb-1">Business Category</Label>

          <Controller
            name="businessCategory"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border">
                  <SelectValue>
                    {field.value ? (
                      <TranslatedValue text={field.value} lang={currentLang} />
                    ) : (
                      "Select Category"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem key={item._id} value={item.name}>
                        <span>{item.name}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {/* {errors?.category && (
            <span className="text-red-400">{errors.category.message}</span>
          )} */}
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

        {/* <div className="space-y-2">
          <Label htmlFor="whatsApp">WhatsApp Number</Label>

          <div className="flex gap-2">
            <SearchableCountrySelect
              value={watch("countryCode")}
              onChange={(dialCode: string) => {
                setValue("countryCode", dialCode);
                triggerValidation("countryCode");
              }}
              error={errors.countryCode}
              countryList={countryList}
            />

            <Input
              type="tel"
              {...register("whatsApp", {
                required: "Phone number required",
                pattern: {
                  value: /^[0-9]{6,14}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Phone number"
            />
          </div>
        </div> */}

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
