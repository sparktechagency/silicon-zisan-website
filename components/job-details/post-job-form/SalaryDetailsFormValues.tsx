import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import PackeageType from "../PackeageType";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SalaryDetailsFormValues({ control, register }: any) {
  return (
    <div>
      {" "}
      <div className="mb-4">
        <div className="flex items-center space-x-5 my-5">
          <Label className="block text-sm mb-1">Salary Type</Label>
          <Controller
            name="salaryType"
            control={control}
            defaultValue="day"
            render={({ field }) => (
              <PackeageType value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <Input
          {...register("salaryAmount")}
          type="text"
          placeholder="Type here"
          className="px-3 py-2 text-gray-200 placeholder:text-white"
        />
      </div>
      {/* Job Description */}
      <div className="mb-4">
        <Label className="block text-sm mb-1">Job Description</Label>
        <Textarea
          {...register("description")}
          rows={3}
          placeholder="Type here"
          className="w-full h-32 px-3 py-2 text-gray-200"
        />
      </div>
    </div>
  );
}
