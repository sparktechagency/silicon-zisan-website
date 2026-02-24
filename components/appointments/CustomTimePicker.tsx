/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

type Props = {
  name: string;
  control: any;
  rules?: any;
};

// import { useEffect, useState } from "react";
// import { Controller } from "react-hook-form";

export default function CustomTimePicker({ name, control, rules }: any) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TimePicker field={field} fieldState={fieldState} />
      )}
    />
  );
}

function TimePicker({ field, fieldState }: any) {
  // store selected hour/minute
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  // sync local state whenever field.value changes
  useEffect(() => {
    if (!field.value) {
      setHour("");
      setMinute("");
      return;
    }

    if (dayjs.isDayjs(field.value)) {
      setHour(String(field.value.hour()).padStart(2, "0"));
      setMinute(String(field.value.minute()).padStart(2, "0"));
      return;
    }

    if (typeof field.value === "string" && field.value.includes(":")) {
      const [h, m] = field.value.split(":");
      setHour(h.padStart(2, "0"));
      setMinute(m.padStart(2, "0"));
    }
  }, [field.value]);

  // update form when hour or minute changes
  const onChange = (newHour?: string, newMinute?: string) => {
    const h = newHour ?? hour;
    const m = newMinute ?? minute;
    setHour(h);
    setMinute(m);

    if (h && m) {
      field.onChange(`${h}:${m}`);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* Hours */}
        <Select value={hour} onValueChange={(h) => onChange(h, undefined)}>
          <SelectTrigger className="w-full button-unactive">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  <span className="notranslate">{h || 0}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="text-lg">:</span>

        {/* Minutes */}
        <Select value={minute} onValueChange={(m) => onChange(undefined, m)}>
          <SelectTrigger className="w-full button-unactive">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  <span className="notranslate">{m}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {fieldState.error && (
        <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
      )}
    </div>
  );
}

// function TimePicker({ field, fieldState }: any) {
//   const [time, setTime] = useState({ hour: "", minute: "" });

//   useEffect(() => {
//     if (!field.value) {
//       setTime({ hour: "", minute: "" });
//       return;
//     }

//     // ✅ If value is dayjs
//     if (dayjs.isDayjs(field.value)) {
//       setTime({
//         hour: String(field.value.hour()).padStart(2, "0"),
//         minute: String(field.value.minute()).padStart(2, "0"),
//       });
//       return;
//     }

//     // ✅ If value is "HH:mm" string
//     if (typeof field.value === "string" && field.value.includes(":")) {
//       const [hour, minute] = field.value.split(":");
//       setTime({
//         hour: hour.padStart(2, "0"),
//         minute: minute.padStart(2, "0"),
//       });
//     }
//   }, [field.value]);

//   const update = (next: Partial<typeof time>) => {
//     setTime((prev) => {
//       const value = { ...prev, ...next };

//       if (value.hour && value.minute) {
//         field.onChange(`${value.hour}:${value.minute}`);
//       }

//       return value;
//     });
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-3">
//         <Select value={time.hour} onValueChange={(hour) => update({ hour })}>
//           <SelectTrigger className="w-full button-unactive">
//             <SelectValue placeholder="HH" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {hours.map((h) => (
//                 <SelectItem key={h} value={h}>
//                   <span className="notranslate"> {h}</span>
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <span className="text-lg">:</span>

//         <Select
//           value={time.minute}
//           onValueChange={(minute) => update({ minute })}
//         >
//           <SelectTrigger className="w-full button-unactive">
//             <SelectValue placeholder="MM" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {minutes.map((m) => (
//                 <SelectItem key={m} value={m}>
//                   <span className="notranslate"> {m}</span>
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {fieldState.error && (
//         <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//       )}
//     </div>
//   );
// }
