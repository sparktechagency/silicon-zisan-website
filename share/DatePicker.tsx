import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    setDate(undefined);
    setOpen(false);
  };
  const handleOk = () => setOpen(false);

  return (
    <div className="flex flex-col items-center justify-center bg-card">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="button-unactive bg-card text-white w-full">
            {date ? format(date, "EEE, MMM d") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" rounded-xl p-0 bg-card text-white">
          <div className="flex flex-col  rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b text-center">
              <p className="text-gray-500 text-sm">Select date</p>
              <p className="text-2xl font-medium mt-1">
                {date ? format(date, "EEE, MMM d") : "Select date"}
              </p>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={date}
                onMonthChange={setDate}
                captionLayout="dropdown"
                className="w-full"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-2 border-t px-4 py-2">
              <Button
                className="border border-gray-400/30 bg-card"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className={`border border-gray-400/30 bg-card ${
                  date ? "custom-btn" : ""
                }`}
                onClick={handleOk}
              >
                Add
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
