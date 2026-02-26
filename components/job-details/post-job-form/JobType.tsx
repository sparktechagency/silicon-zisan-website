"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes } from "@/demoData/data";
import { useCookie } from "@/hooks/useCookies";
import { Controller } from "react-hook-form";

export default function JobType({ control, register, errors }: any) {
  const googtrans = useCookie("googtrans");

  const currentLang = (googtrans
    .replace(/^\/en\//, "") // remove /en/ at the start
    .replace(/^en\//, "") // remove en/ at the start if no leading slash
    .replace(/\/$/, "") || "en") as keyof (typeof jobTypes)[0]["label"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-4 mb-4">
      <div>
        <Label className="block text-sm mb-1">Job Type</Label>
        <Controller
          name="jobType"
          control={control}
          rules={{ required: "Job type is required" }}
          render={({ field }) => (
            // <Select value={field.value} onValueChange={field.onChange}>
            //   <SelectTrigger className="w-full border">
            //     <SelectValue placeholder="Select Item" />
            //   </SelectTrigger>

            //   <SelectContent>
            //     <SelectGroup>
            //       {jobTypes?.map((item, index) => (
            //         <SelectItem key={index} value={item}>
            //           <span className="notranslate"> {item}</span>
            //         </SelectItem>
            //       ))}
            //     </SelectGroup>
            //   </SelectContent>
            // </Select>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="button-unactive text-white w-full">
                <SelectValue>
                  {field.value
                    ? jobTypes.find((opt) => opt.value === field.value)?.label[
                        currentLang
                      ]
                    : "Select Timeline"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {jobTypes?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label[currentLang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.jobType && (
          <span className="text-red-400">{errors.jobType.message}</span>
        )}
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
