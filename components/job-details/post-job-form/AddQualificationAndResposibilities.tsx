import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";

type Props = {
  register: any;
  responsibilities: any[];
  addResponsibility: (value: any) => void;
  removeResponsibility: (index: number) => void;
  qualifications: any[];
  addQualification: (value: any) => void;
  removeQualification: (index: number) => void;
  errors: any;
};

export default function AddQualificationAndResposibilities({
  register,
  responsibilities,
  addResponsibility,
  removeResponsibility,
  qualifications,
  addQualification,
  removeQualification,
  errors,
}: Props) {
  return (
    <div>
      {/* Key Responsibilities */}
      <div className="mb-4">
        <div className="flex justify-between mb-3">
          <Label className="block text-sm mb-1">Key Responsibilities</Label>
          <Plus
            className="border p-1 rounded-full cursor-pointer"
            onClick={() => addResponsibility({ value: "" })}
          />
        </div>
        {responsibilities.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <Textarea
                {...register(`responsibilities.${index}.value`, {
                  required: "Responsibility is required",
                })}
                rows={3}
                placeholder="Type here"
                className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
              />
              <Minus
                className="text-red-500 cursor-pointer"
                onClick={() => removeResponsibility(index)}
              />
            </div>
            {errors?.responsibilities?.[index]?.value && (
              <p className="text-red-400 text-sm">
                {errors.responsibilities[index].value.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Required Qualification */}
      <div className="mb-4">
        <div className="flex justify-between mb-3">
          <Label className="block text-sm mb-1">Required Qualification</Label>
          <Plus
            className="border p-1 rounded-full cursor-pointer"
            onClick={() => addQualification({ value: "" })}
          />
        </div>
        {qualifications.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <Textarea
                {...register(`qualifications.${index}.value`, {
                  required: "Qualification is required",
                })}
                rows={3}
                placeholder="Type here"
                className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
              />
              <Minus
                className="text-red-500 cursor-pointer"
                onClick={() => removeQualification(index)}
              />
            </div>
            {errors?.qualifications?.[index]?.value && (
              <p className="text-red-400 text-sm">
                {errors.qualifications[index].value.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
