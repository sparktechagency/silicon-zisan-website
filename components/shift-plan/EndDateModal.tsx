"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

export function EndDateModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = React.useState(false);

  // get value from URL on first render
  const startDateParam = searchParams.get("endDate");

  const [date, setDate] = React.useState<Date | undefined>(
    startDateParam ? new Date(startDateParam) : undefined,
  );

  const updateSearchParams = (date: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("endDate", dayjs(date).format("YYYY-MM-DD"));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Field className="mx-auto xl:w-44">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start font-normal rounded-full size-12"
          >
            {date ? dayjs(date).format("YYYY-MM-DD") : "End Date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              setDate(selectedDate);
              updateSearchParams(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
