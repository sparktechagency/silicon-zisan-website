import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobRoles } from "@/demoData/data";

export default function Categories({ control }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <Label className="block text-sm mb-1">Category</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {jobRoles?.map((item, index) => (
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
        <Label className="block text-sm mb-1">Sub Category</Label>
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="senior-business">
                    senior business analytics
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
