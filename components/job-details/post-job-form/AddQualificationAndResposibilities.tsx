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
};

export default function AddQualificationAndResposibilities({
  register,
  responsibilities,
  addResponsibility,
  removeResponsibility,
  qualifications,
  addQualification,
  removeQualification,
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
          <div key={item.id} className="flex items-center gap-3">
            <Textarea
              {...register(`responsibilities.${index}.value`)}
              rows={3}
              placeholder="Type here"
              className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
            />
            <Minus
              className="text-red-500 cursor-pointer"
              onClick={() => removeResponsibility(index)}
            />
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
          <div key={item.id} className="flex items-center gap-3">
            <Textarea
              {...register(`qualifications.${index}.value`)}
              rows={3}
              placeholder="Type here"
              className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
            />
            <Minus
              className="text-red-500 cursor-pointer"
              onClick={() => removeQualification(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
