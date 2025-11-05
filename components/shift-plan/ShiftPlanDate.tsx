"use client";

import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { useState, useMemo } from "react";
import { Label } from "../ui/label";
import CustomDatePicker from "../appointments/CustomDatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import Container from "@/share/Container";
import { set } from "zod";

export default function ShiftPlanDate({
  selectedDates,
  setSelectedDates,
}: any) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(false);
  const handleOk = () => setOpen(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ✅ Compute start and end dates dynamically when month changes
  const days = useMemo(() => {
    const startDate = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0, // Sunday
    });
    const endDate = endOfWeek(endOfMonth(currentMonth), {
      weekStartsOn: 0,
    });

    const tempDays = [];
    let day = startDate;
    while (day <= endDate) {
      tempDays.push(day);
      day = addDays(day, 1);
    }
    return tempDays;
  }, [currentMonth]);

  const toggleDate = (date: any) => {
    const exists = selectedDates.some((d: any) => isSameDay(d, date));
    if (exists) {
      setSelectedDates(selectedDates.filter((d: any) => !isSameDay(d, date)));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <Container className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center md:items-stretch">
        <div className="flex flex-col bg-white items-center w-full  rounded-xl ">
          {/* Header */}
          <div className="p-4 border-b text-center">
            <p className="text-gray-500 text-sm">Select date</p>
            <p className="text-2xl font-medium mt-1">
              {date ? format(date, "EEE, MMM d") : "Select date"}
            </p>
          </div>

          {/* Calendar */}
          <div className="p-3 ">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              month={date}
              onMonthChange={setDate}
              captionLayout="dropdown"
              className="bg-white text-black sm:w-[400px]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 border-t px-4 py-2">
            <Button
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleOk}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
      {/* Shift Time */}
      <div className="space-y-2 px- mt-6 ">
        <Label className="block font-semibold">Shift Time</Label>
        <div className="grid sm:grid-cols-2 gap-4 mx-auto w-full ">
          <div className="flex-1">
            <Label className="block mb-2">From</Label>
            <CustomDatePicker />
            {selectedDates.length > 0 && (
              <div className="text-sm text-white mt-2">
                {selectedDates[0].toLocaleDateString()} -{" "}
                {selectedDates[selectedDates.length - 1].toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <Label className="block mb-2">To</Label>
            <CustomDatePicker />
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
