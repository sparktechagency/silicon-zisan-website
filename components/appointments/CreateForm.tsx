import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import HourMinutePicker from "./CustomDatePicker";
import { DatePicker } from "@/share/DatePicker";

export function CreateForm() {
  const [selectedOption, setSelectedOption] = useState("call");
  const [meetingAddress, setMeetingAddress] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("15:30");

  return (
    <div className=" bg-[#334455] text-white rounded-md space-y-6 border border-gray-300/30 p-5 mt-5">
      <h1 className="text-white text-lg">Confirm Appointment</h1>

      <Select>
        <SelectTrigger className=" text-white border-white/20 w-full bg-card">
          <SelectValue placeholder="Search Job Seeker" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seeker1">Seeker 1</SelectItem>
          <SelectItem value="seeker2">Seeker 2</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4">
        {/* <Input
          type="date"
          className="bg-card text-white border border-white/20 [&::-webkit-calendar-picker-indicator]:invert"
        /> */}
        <DatePicker />

        <HourMinutePicker />
      </div>

      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="call" id="call" />
          {/* className="bg-blue-600 text-white data-[state=checked]:bg-blue-700" */}
          <Label
            htmlFor="call"
            className="text-[12px] sm:text-sm leading-relaxed"
          >
            An appointment is available for you on 01.02.2025/17:25 Uhr. Kindly
            confirm it in your JobsinApp Account and share your active contact
            number. We will call you.
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="address" id="address" />
          <Label
            htmlFor="address"
            className="text-[12px] sm:text-sm leading-relaxed"
          >
            An Appointment Is Available For You On 01.02.2025/17:25 Uhr. Kindly
            Confirm It In Your JobsinApp Account. Please Come To This Address.
          </Label>
        </div>

        {selectedOption === "address" && (
          <Input
            placeholder="Type Here Meeting Address"
            value={meetingAddress}
            onChange={(e) => setMeetingAddress(e.target.value)}
            className="bg-card text-white border-white/20"
          />
        )}
      </RadioGroup>

      <Textarea
        placeholder="Type Here Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-card text-white border-white/20 text-sm sm:text-md"
      />

      <div className="flex justify-end">
        <Button className="w-60 custom-btn text-white sm:text-lg">
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
}
