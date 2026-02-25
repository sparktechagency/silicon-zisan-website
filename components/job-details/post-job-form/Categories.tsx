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
import { useCookie } from "@/hooks/useCookies";
import { TranslatedValue } from "@/hooks/TranslatedValue";

interface CategoriesProps {
  control: any;
  categories: {
    name: string;
    _id: string;
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

  const googtrans = useCookie("googtrans");
  const currentLang =
    googtrans
      .replace(/^\/en\//, "")
      .replace(/^en\//, "")
      .replace(/\/$/, "") || "en";

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
                <SelectValue placeholder="Select Category">
                  {field.value ? (
                    <TranslatedValue text={field.value} lang={currentLang} />
                  ) : (
                    "Select Category"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    <SelectItem key={item._id} value={item.name}>
                      <span>{item.name}</span>
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
                <SelectValue placeholder="Select SubCategory">
                  {field.value ? (
                    <TranslatedValue text={field.value} lang={currentLang} />
                  ) : (
                    "Select SubCategory"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subCategories.map((sub, index) => (
                    <SelectItem key={`${index}`} value={String(sub)}>
                      <span className=""> {sub}</span>
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
