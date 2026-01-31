import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import PackeageType from "../PackeageType";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SalaryDetailsFormValues({
  control,
  register,
  errors,
}: any) {
  return (
    <div>
      <div className="mb-4">
        {/* Salary Type */}
        <div className="flex items-center space-x-5 my-5">
          <Label className="block text-sm mb-1">Salary Type</Label>
          <Controller
            name="salaryType"
            control={control}
            defaultValue="Hour"
            rules={{ required: "Salary type is required" }}
            render={({ field }) => (
              <PackeageType value={field.value} onChange={field.onChange} />
            )}
          />
          {errors?.salaryType && (
            <span className="text-red-400">{errors.salaryType.message}</span>
          )}
        </div>

        {/* Salary Amount */}
        <Label className="block text-sm mb-1">Salary Amount</Label>
        <Input
          {...register("salaryAmount", {
            required: "Salary amount is required",
          })}
          type="number"
          placeholder="Salary amount €
"
          className="px-3 py-2 text-gray-200 placeholder:text-white"
        />
        {errors?.salaryAmount && (
          <span className="text-red-400">{errors.salaryAmount.message}</span>
        )}
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <Label className="block text-sm mb-1">Job Description</Label>
        <Textarea
          {...register("description", {
            required: "Job description is required",
          })}
          rows={3}
          placeholder="Type here"
          className="w-full h-32 px-3 py-2 text-gray-200"
        />
        {errors?.description && (
          <span className="text-red-400">{errors.description.message}</span>
        )}
      </div>
    </div>
  );
}
