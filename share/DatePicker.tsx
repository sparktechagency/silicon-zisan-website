import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    onChange(undefined);
    setOpen(false);
  };

  const handleOk = () => setOpen(false);

  return (
    <div className="flex flex-col items-center justify-center bg-card">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="button-unactive bg-card text-white w-full">
            {value ? format(value, "EEE, MMM d") : "Select date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full rounded-xl p-0 bg-card text-white">
          <div className="flex flex-col rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b text-center">
              <p className="text-gray-500 text-sm">Select date</p>
              <p className="text-2xl font-medium mt-1">
                {value ? format(value, "EEE, MMM d") : "Select date"}
              </p>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                month={value}
                onMonthChange={onChange}
                captionLayout="dropdown"
                className="w-full bg-card calendar-dropdown"
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
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
                  value ? "custom-btn" : ""
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
