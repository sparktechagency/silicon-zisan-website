"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import Categories from "./Categories";
import JobType from "./JobType";
import SalaryDetailsFormValues from "./SalaryDetailsFormValues";
import AddQualificationAndResposibilities from "./AddQualificationAndResposibilities";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { Button } from "@/components/ui/button";
import { revalidate } from "@/utils/revalidateTag";
import { useRouter } from "next/navigation";

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

export default function EditJobPost({ data }: any) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: data?.category || "",
      subCategory: data?.subCategory || "",
      jobType: data?.jobType || "",
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
    replace: replaceResponsibilities,
    append: addResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const {
    fields: qualifications,
    replace: replaceQualifications,
    append: addQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  useEffect(() => {
    if (!data) return;

    reset({
      category: data.category ?? "",
      subCategory: data.subCategory ?? "",
      jobType: data.jobType ?? "",
      deadline: data.deadline.slice(0, 10),
      salaryType: data.salaryType ?? "",
      salaryAmount: data.salaryAmount ?? "",
      description: data.description ?? "",
      aboutCompany: data.aboutCompany ?? "",
    });

    replaceResponsibilities(
      data.responsibilities?.length
        ? data.responsibilities.map((r: string) => ({ value: r }))
        : [{ value: "" }],
    );

    replaceQualifications(
      data.qualifications?.length
        ? data.qualifications.map((q: string) => ({ value: q }))
        : [{ value: "" }],
    );
  }, [data, reset, replaceResponsibilities, replaceQualifications]);

  // categories get
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await myFetch("/categories");
        setCategories(data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!values.jobType) {
      toast.error("Please select job type");
      return;
    }
    const payload = {
      ...values,
      deadline: values.deadline
        ? new Date(values.deadline).toISOString()
        : null,
      salaryAmount: values.salaryAmount ? Number(values.salaryAmount) : null,
      responsibilities: values.responsibilities.map((r) => r.value),
      qualifications: values.qualifications.map((q) => q.value),
    };

    try {
      const res = await myFetch(`/jobs/update/${data._id}`, {
        method: "PATCH",
        body: payload,
      });

      if (res?.success) {
        toast.success(res.message);
        await revalidate("apply-jobs");
        router.push("/view-details-jobs/" + data._id);
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
    <Container
      className={`bg-card w-[50%] mx-auto"
      p-5 border rounded-md`}
    >
      <div className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CustomBackButton />
        <p>Edit Job Post</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-100 w-full rounded-xl">
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
              {...register("aboutCompany")}
              placeholder="Type here"
              className="h-32 px-3 py-2 text-gray-200"
            />
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end mt-6">
            <Button
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
}
