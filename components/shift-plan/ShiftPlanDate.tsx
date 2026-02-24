"use client";

import { isSameDay } from "date-fns";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import Container from "@/share/Container";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";

export default function ShiftPlanDate({
  selectedDates,
  setSelectedDates,
  onHanldeShift,
  plans,
  onHandleRemove,
  reset,
}: any) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const disabledDate = (date: Date) => {
    return plans.some((plan: any) =>
      plan.days.some((d: string) => isSameDay(new Date(d), date)),
    );
  };

  return (
    <Container className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center md:items-stretch">
        <div className="flex flex-col bg-card text-white items-center w-full  rounded-xl ">
          {/* Calendar */}
          <div className="">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              month={date}
              onMonthChange={setDate}
              captionLayout="dropdown"
              className="bg-card sm:w-100 dropdown:text-black calendar-dropdown"
              modifiers={{
                selected: (date) =>
                  selectedDates.some((selected: Date) =>
                    isSameDay(selected, date),
                  ),
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                disabledDate?.(date)
              }
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 px-4 py-2">
            {/* <Button
              className="border border-gray-400/400 bg-card"
              onClick={handleCancel}
            >
              Cancel
            </Button> */}
            <Button
              className={`${
                selectedDates.length > 0
                  ? "custom-btn"
                  : "bg-card border border-gray-400/400"
              }`}
              onClick={() => {
                onHanldeShift();
                reset();
              }}
            >
              Add Plan
            </Button>
          </div>
        </div>
      </div>
      {/* Shift Time */}
      <div className="space-y-2 px- mt-6 ">
        <Label className="block font-semibold">Shift Time</Label>
        <div className="flex pr-4">
          <div className=" gap-4 mx-auto w-full ">
            <div className="flex-1  flex items-center gap-8">
              <div>
                {plans?.map((item: any, index: number) => {
                  const first = dayjs(item?.days[0])?.format("YYYY-MM-DD");
                  const last = dayjs(item?.days[item?.days?.length - 1]).format(
                    "YYYY-MM-DD",
                  );

                  return (
                    <div className="flex justify-between" key={index}>
                      {" "}
                      <div className="grid grid-cols-2 gap-9 my-2">
                        <div>
                          {first} – {last}
                        </div>
                        <div className="flex items-start">
                          {item.days.length} Days Plan
                        </div>
                      </div>
                      <div>
                        <Trash2
                          className="text-red-400 cursor-pointer"
                          onClick={() => onHandleRemove(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
