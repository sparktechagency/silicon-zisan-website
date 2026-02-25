/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/share/Container";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Categories from "../job-details/post-job-form/Categories";
import JobType from "../job-details/post-job-form/JobType";
import SalaryDetailsFormValues from "../job-details/post-job-form/SalaryDetailsFormValues";
import AddQualificationAndResposibilities from "../job-details/post-job-form/AddQualificationAndResposibilities";
import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { experiences } from "@/demoData/data";
import { useCookie } from "@/hooks/useCookies";

// const expriences = ["With Experience", "Without Experience"];

type FormValues = {
  category: string;
  subCategory: string;
  jobType: string;
  experience: string;
  deadline: string;
  salaryType: string;
  salaryAmount: string;
  description: string;
  responsibilities: { value: string }[];
  qualifications: { value: string }[];
  aboutCompany: string;
};

const PostJobForm = () => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: "",
      subCategory: "",
      jobType: "",
      experience: "",
      deadline: "",
      salaryType: "",
      salaryAmount: "",
      description: "",
      responsibilities: [{ value: "" }],
      qualifications: [{ value: "" }],
      aboutCompany: "",
    },
  });

  const {
    fields: responsibilities,
    append: addResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const {
    fields: qualifications,
    append: addQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const name = searchParams.get("name");

  const selectedSubCategory = categories[Number(watch("subCategory"))];

  const googtrans = useCookie("googtrans");

  const currentLang = (googtrans
    .replace(/^\/en\//, "") // remove /en/ at the start
    .replace(/^en\//, "") // remove en/ at the start if no leading slash
    .replace(/\/$/, "") || "en") as keyof (typeof experiences)[0]["label"];

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

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoading(true);
    const payload = {
      ...data,
      responsibilities: data.responsibilities.map((item) => item.value),
      qualifications: data.qualifications.map((item) => item.value),
      salaryAmount: Number(data.salaryAmount),
    };

    try {
      const res = await myFetch("/jobs/create", {
        method: "POST",
        body: payload,
      });

      if (res.status === 402) {
        router.push("/subscriptions");
      }

      if (res.success) {
        toast.success(res.message);
        router.push("/my-jobs");
        reset();
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className={`bg-card ${
        name === "Post Job" ? "w-full" : "w-[50%] mx-auto"
      } p-5 border rounded-md`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-100 w-full rounded-xl">
          <div className="text-xl font-semibold mb-4 flex items-center gap-2">
            {/* <CustomBackButton /> */}
            <p>Job Post</p>
          </div>

          {/* Category & Subcategory */}
          <Categories
            control={control}
            categories={categories}
            errors={errors}
          />

          {/* Job Type & Deadline */}

          <JobType control={control} register={register} errors={errors} />

          {/* with out exprience */}
          <div className="mb-3">
            <Label className="block text-sm mb-1">Exprience</Label>
            <Controller
              name="experience"
              control={control}
              rules={{ required: "Exprience is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="button-unactive text-white w-full">
                    <SelectValue>
                      {field.value
                        ? experiences?.find((opt) => opt.value === field.value)
                            ?.label[currentLang]
                        : "Select Timeline"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {experiences?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label[currentLang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.experience && (
              <span className="text-red-400">{errors.experience.message}</span>
            )}
          </div>

          {/* Salary Type*/}
          <SalaryDetailsFormValues
            control={control}
            register={register}
            errors={errors}
          />

          <AddQualificationAndResposibilities
            register={register}
            responsibilities={responsibilities}
            addResponsibility={addResponsibility}
            removeResponsibility={removeResponsibility}
            qualifications={qualifications}
            addQualification={addQualification}
            removeQualification={removeQualification}
            errors={errors}
          />

          {/* About Yourself */}
          <div className="mb-6">
            <Label className="block text-sm mb-1">About Yourself</Label>
            <Textarea
              {...register("aboutCompany", {
                required: "Required about yourself",
              })}
              placeholder="Type here"
              className="h-32 px-3 py-2 text-gray-200"
            />
            {errors.aboutCompany && (
              <span className="text-red-400">
                {errors.aboutCompany.message}
              </span>
            )}
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end mt-6">
            <Button
              disabled={loading}
              type="submit"
              className="custom-btn text-white font-medium sm:px-6 py-2 rounded-md hover:opacity-90 transition px-2"
            >
              Confirm
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default PostJobForm;
