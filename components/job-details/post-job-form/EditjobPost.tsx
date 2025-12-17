"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
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
  const { register, control, reset, handleSubmit } = useForm<FormValues>({
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
        : [{ value: "" }]
    );

    replaceQualifications(
      data.qualifications?.length
        ? data.qualifications.map((q: string) => ({ value: q }))
        : [{ value: "" }]
    );
  }, [data, reset, replaceResponsibilities, replaceQualifications]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const payload = {
      ...values,
      deadline: values.deadline
        ? new Date(values.deadline).toISOString()
        : null,
      responsibilities: values.responsibilities.map((r) => r.value),
      qualifications: values.qualifications.map((q) => q.value),
    };
    console.log("edit ", payload);

    try {
      const res = await myFetch(`/jobs/update/${data._id}`, {
        method: "PATCH",
        body: payload,
      });
      console.log("edit update", res);
    } catch (err) {
      toast.error(reset.message);
    }
  };

  return (
    <Container
      className={`bg-card w-[50%] mx-auto"
      p-5 border rounded-md`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-100 w-full rounded-xl">
          <div className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CustomBackButton />
            <p>Edit Job Post</p>
          </div>

          {/* Category & Subcategory */}
          <Categories control={control} register={register} />

          {/* Job Type & Deadline */}
          <JobType control={control} register={register} />

          {/* Salary Type*/}
          <SalaryDetailsFormValues control={control} register={register} />

          <AddQualificationAndResposibilities
            register={register}
            responsibilities={responsibilities}
            addResponsibility={addResponsibility}
            removeResponsibility={removeResponsibility}
            qualifications={qualifications}
            addQualification={addQualification}
            removeQualification={removeQualification}
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
            <button
              type="submit"
              className="custom-btn text-white font-medium sm:px-6 py-2 rounded-md hover:opacity-90 transition px-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
