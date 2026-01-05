import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes } from "@/demoData/data";
import { Controller } from "react-hook-form";

export default function JobType({ control, register }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <Label className="block text-sm mb-1">Job Type</Label>
        <Controller
          name="jobType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {jobTypes?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label className="block text-sm mb-1">Deadline</Label>
        <Input
          {...register("deadline")}
          type="date"
          placeholder="Type Here"
          className="w-full px-3 py-2 text-gray-200"
        />
      </div>
    </div>
  );
}
