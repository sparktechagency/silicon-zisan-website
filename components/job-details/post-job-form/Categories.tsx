/* eslint-disable react/display-name */
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
import { memo, useEffect, useState } from "react";
import { useCookie } from "@/hooks/useCookies";

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

  // const TranslatedValue = ({ text, lang = "en" }: any) => {
  //   const [translated, setTranslated] = useState(text);

  //   useEffect(() => {
  //     const getTranslation = async () => {
  //       // API কী এবং লজিক এখানে থাকবে
  //       const res = await translateText(text, lang);
  //       setTranslated(res);
  //     };
  //     if (text) getTranslation();
  //   }, [text, lang]);

  //   return <span>{translated}</span>;
  // };

  const TranslatedValue = memo(({ text, lang }: any) => {
    const [translated, setTranslated] = useState(text);

    useEffect(() => {
      let isMounted = true; // Cleanup flag

      const getTranslation = async () => {
        if (!text) return;
        const cached = sessionStorage.getItem(`trans_${lang}_${text}`);
        if (cached) {
          setTranslated(cached);
          return;
        }

        const res = await translateText(text, lang);
        if (isMounted) {
          setTranslated(res);
          sessionStorage.setItem(`trans_${lang}_${text}`, res); // cache result
        }
      };

      getTranslation();

      return () => {
        isMounted = false; // prevent state update if unmounted
      };
    }, [text, lang]);

    return <span>{translated}</span>;
  });

  async function translateText(text: string, target: string) {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target, format: "text" }),
      },
    );
    const data = await res.json();
    console.log(
      "data.data.translations[0].translatedText",
      data.data.translations[0].translatedText,
    );

    return data.data.translations[0].translatedText;
  }

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
                    // এখানে সরাসরি await না করে কম্পোনেন্ট কল করুন
                    <TranslatedValue text={field.value} lang={currentLang} />
                  ) : (
                    "Select Category"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    // value হিসেবে English name ই রাখুন যাতে logic ঠিক থাকে
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
                    // এখানে সরাসরি await না করে কম্পোনেন্ট কল করুন
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
