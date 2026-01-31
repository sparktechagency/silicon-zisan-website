/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Categories from "../job-details/post-job-form/Categories";
import JobType from "../job-details/post-job-form/JobType";
import SalaryDetailsFormValues from "../job-details/post-job-form/SalaryDetailsFormValues";
import AddQualificationAndResposibilities from "../job-details/post-job-form/AddQualificationAndResposibilities";
import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTag";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormValues = {
  category: string;
  subCategory: string;
  jobType: string;
  deadline: string;
  salaryType: string;
  salaryAmount: string;
  description: string;
  responsibilities: { value: string }[];
  qualifications: { value: string }[];
  aboutCompany: string;
};

const HireEmployeeForm = () => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: "",
      subCategory: "",
      jobType: "",
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
    setSubmitLoading(true);
    const payload = {
      ...data,
      responsibilities: data.responsibilities.map((item) => item.value),
      qualifications: data.qualifications.map((item) => item.value),
      salaryAmount: Number(data.salaryAmount),
      experience: "With Experience",
      isHiringRequest: true,
    };
    try {
      const res = await myFetch("/jobs/create", {
        method: "POST",
        body: payload,
      });

      // if (res.status === 402) {
      //   router.push("/subscriptions");
      // }

      if (res.success) {
        toast.success("Application submitted successfully");
        await revalidate("hire-employee");
        setTimeout(() => {
          router.push("/hire-employees");
        }, 500);
      } else {
        toast.error((res as any).error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setSubmitLoading(false);
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
            <CustomBackButton />
            <p>Hire Employee</p>
          </div>

          {/* Category & Subcategory */}
          <Categories
            control={control}
            categories={categories}
            errors={errors}
          />

          {/* Job Type & Deadline */}
          <JobType control={control} register={register} errors={errors} />

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

          <div className=" rounded-md space-y-3 text-sm text-white">
            <label className="flex items-start gap-3">
              <Input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-white"
                required
              />
              <span>
                By Continuing, You Accept The{" "}
                <a href="#" className="underline font-semibold">
                  Privacy Policy
                </a>
                And{" "}
                <a href="#" className="underline font-semibold">
                  Terms & Conditions
                </a>{" "}
                of JobsinApp.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <Input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-white"
                required
              />
              <span>
                By Ticking The Checkbox, The Client Declares Their Consent, The
                Contract Thereby Comes Into Effect.
              </span>
            </label>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={submitLoading}
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

export default HireEmployeeForm;
