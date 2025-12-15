/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AddQualificationAndResposibilities from "./AddQualificationAndResposibilities";
import SalaryDetailsFormValues from "./SalaryDetailsFormValues";
import Categories from "./Categories";
import JobType from "./JobType";

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

const EditJobPost = ({ title }: { title?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      category: "",
      subCategory: "",
      jobType: "",
      deadline: "",
      salaryType: "",
      salaryAmount: "",
      description: "",
      responsibilities: [],
      qualifications: [],
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
  const hire = searchParams.get("type");

  const handleParamsSet = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", name);
    router.push(`?${params.toString()}`);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log("FORM DATA 👉", data);

    if (title === "Hire Employee") {
      handleParamsSet("hire-employee-details");
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
            {hire ? hire : title}
          </div>

          {/* Category & Subcategory */}
          <Categories control={control} />

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
};

export default EditJobPost;
