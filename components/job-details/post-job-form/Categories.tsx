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

type Category = {
  name: string;
  subCategories: string[];
};

interface CategoriesProps {
  control: any; // React Hook Form control
  categories: Category[];
}

export default function Categories({ control, categories }: CategoriesProps) {
  // Watch selected category
  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  // Get subcategories for the selected category
  const subCategories =
    categories?.find((c) => c.name === selectedCategory)?.subCategories || [];
  console.log("selectedCategory", selectedCategory);

  console.log("sub", subCategories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Category Dropdown */}
      <div>
        <Label className="block text-sm mb-1">Category</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories?.map((item, index) => (
                    <SelectItem key={`${item.name}-${index}`} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Subcategory Dropdown */}
      <div>
        <Label className="block text-sm mb-1">Sub Category</Label>
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subCategories?.map((sub, index) => (
                    <SelectItem key={`${sub}-${index}`} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
