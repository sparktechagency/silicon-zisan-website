"use client";

import { isSameDay } from "date-fns";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import Container from "@/share/Container";

export default function ShiftPlanDate({
  selectedDates,
  setSelectedDates,
}: any) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleCancel = () => setSelectedDates([]);
  // const handleOk = () => setOpen(false);

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
              className="bg-card sm:w-[400px] dropdown:text-black calendar-dropdown"
              modifiers={{
                selected: (date) =>
                  selectedDates.some((selected: Date) =>
                    isSameDay(selected, date)
                  ),
              }}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 px-4 py-2">
            <Button
              className="border border-gray-400/400 bg-card"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {/* <Button
              className={`${
                selectedDates.length > 0
                  ? "custom-btn"
                  : "bg-card border border-gray-400/400"
              }`}
              onClick={handleOk}
            >
              Add
            </Button> */}
          </div>
        </div>
      </div>
      {/* Shift Time */}
      <div className="space-y-2 px- mt-6 ">
        <Label className="block font-semibold">Shift Time</Label>
        <div className="grid sm:grid-cols-2 gap-4 mx-auto w-full ">
          <div className="flex-1">
            {selectedDates.length > 0 && (
              <div className="text-sm text-white mt-2">
                {selectedDates[0].toLocaleDateString()} -{" "}
                {selectedDates[selectedDates.length - 1].toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="flex-1">
            {/* <CustomTimePicker /> */}
            {selectedDates.length > 0 && (
              <div className="text-sm text-white mt-2">
                {selectedDates.length} Days Plan
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
