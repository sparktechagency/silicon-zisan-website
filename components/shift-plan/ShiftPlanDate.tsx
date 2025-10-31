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

export default function ShiftPlanDate({
  selectedDates,
  setSelectedDates,
}: any) {
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
    <>
      <div className="bg-card text-white p-4 rounded-lg w-full max-w-xl mx-auto">
        {/* Header: Month + Year */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
              )
            }
            className="px-2 py-1 border rounded hover:bg-gray-700"
          >
            ◀
          </button>

          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
              )
            }
            className="px-2 py-1 border rounded hover:bg-gray-700"
          >
            ▶
          </button>
        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-medium text-gray-300">
              {day}
            </div>
          ))}

          {/* Dates grid */}
          {days.map((date, index) => {
            const isSelected = selectedDates.some((d: any) =>
              isSameDay(d, date)
            );

            // dim non-current-month days
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

            return (
              <button
                key={index}
                onClick={() => toggleDate(date)}
                className={`py-2 rounded ${
                  isSelected
                    ? "custom-btn"
                    : isCurrentMonth
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-500"
                }`}
              >
                {format(date, "d")}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 rounded border"
            onClick={() => setSelectedDates([])}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 rounded border ${
              selectedDates.length > 0 ? "custom-btn" : ""
            }`}
          >
            Add
          </button>
        </div>
      </div>
      {/* Shift Time */}
      <div className="space-y-2 px- mt-6 max-w-xl mx-auto">
        <Label className="block font-semibold">Shift Time</Label>
        <div className="grid grid-cols-2 gap-4 mx-auto w-full ">
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
    </>
  );
}
