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

  const handleCancel = () => setOpen(false);
  const handleOk = () => setOpen(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="button-unactive bg-card text-white w-full">
            {date ? format(date, "EEE, MMM d") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] rounded-xl p-0">
          <div className="flex flex-col bg-white rounded-xl overflow-hidden">
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
