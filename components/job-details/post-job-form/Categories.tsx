import { Label } from "@/components/ui/label";
import { Controller, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoriesProps {
  control: any;
  categories: {
    name: string;
    subCategories: string[];
  }[];
  errors?: any;
}

export default function Categories({
  control,
  categories,
  errors,
}: CategoriesProps) {
  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const subCategories =
    categories?.find((c) => c.name === selectedCategory)?.subCategories || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Category */}
      <div>
        <Label className="block text-sm mb-1">Category</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item, index) => (
                    <SelectItem key={`${item.name}-${index}`} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.category && (
          <span className="text-red-400">{errors.category.message}</span>
        )}
      </div>

      {/* Sub Category */}
      <div>
        <Label className="block text-sm mb-1">Sub Category</Label>
        <Controller
          name="subCategory"
          control={control}
          rules={{ required: "Sub category is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subCategories.map((sub, index) => (
                    <SelectItem key={`${sub}-${index}`} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.subCategory && (
          <span className="text-red-400">{errors.subCategory.message}</span>
        )}
      </div>
    </div>
  );
}
