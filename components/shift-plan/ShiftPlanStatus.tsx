import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StartDateModal } from "./StartDateModal";
import { EndDateModal } from "./EndDateModal";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { shiftOptions } from "@/demoData/data";
import { useCookie } from "@/hooks/useCookies";

export default function ShiftPlanStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const googtrans = useCookie("googtrans");
  const currentLang = (googtrans
    .replace(/^\/en\//, "")
    .replace(/^en\//, "")
    .replace(/\/$/, "") || "en") as keyof (typeof shiftOptions)[0]["label"];

  const { control } = useForm();

  const handleParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <Controller
            name="shift"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleParams("shift", value);
                  }}
                >
                  <SelectTrigger className="button-unactive text-white w-full rounded-full border border-white cursor-pointer">
                    <SelectValue placeholder="Timeline">
                      {field.value
                        ? shiftOptions.find((opt) => opt.value === field.value)
                            ?.label[currentLang]
                        : "Select Timeline"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label[currentLang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>
        <div>
          <StartDateModal />
        </div>
        <div>
          <EndDateModal />
        </div>
        <div className="">
          <Link href="/create-new-plan">
            <Button className="button-active w-full! lg:w-44 py-3 rounded-3xl">
              Create New Plan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
