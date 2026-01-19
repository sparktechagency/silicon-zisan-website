// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";

// import { Controller } from "react-hook-form";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type TimeState = {
//   hour: string;
//   minute: string;
// };

// const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
// const minutes = Array.from({ length: 60 }, (_, i) =>
//   String(i).padStart(2, "0")
// );

// type Props = {
//   name: string;
//   control: any;
//   rules?: any;
// };

// export default function CustomTimePicker({ name, control, rules }: Props) {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field, fieldState }) => {
//         return <TimePickerContent field={field} fieldState={fieldState} />;
//       }}
//     />
//   );
// }

// // Separate component to properly use hooks
// function TimePickerContent({ field, fieldState }: any) {
//   const [time, setTime] = useState<TimeState>(() => {
//     // Initialize state from field.value on mount
//     if (
//       field.value &&
//       typeof field.value.isValid === "function" &&
//       field.value.isValid() &&
//       typeof field.value.hour === "function"
//     ) {
//       return {
//         hour: String(field.value.hour()).padStart(2, "0"),
//         minute: String(field.value.minute()).padStart(2, "0"),
//       };
//     }
//     return { hour: "", minute: "" };
//   });

//   // Sync field.value changes to local state
//   useEffect(() => {
//     if (
//       field.value &&
//       typeof field.value.isValid === "function" &&
//       field.value.isValid() &&
//       typeof field.value.hour === "function"
//     ) {
//       const newHour = String(field.value.hour()).padStart(2, "0");
//       const newMinute = String(field.value.minute()).padStart(2, "0");

//       // Only update if values actually changed to avoid infinite loops
//       setTime((prev) => {
//         if (prev.hour !== newHour || prev.minute !== newMinute) {
//           return { hour: newHour, minute: newMinute };
//         }
//         return prev;
//       });
//     }
//   }, [field.value]);

//   const updateTime = (next: Partial<TimeState>) => {
//     setTime((prev) => {
//       const newTime = { ...prev, ...next };
//       const h = Number(newTime.hour);
//       const m = Number(newTime.minute);

//       if (!isNaN(h) && !isNaN(m)) {
//         field.onChange((field.value ?? dayjs()).hour(h).minute(m).second(0));
//       }

//       return newTime;
//     });
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-3">
//         <Select
//           value={time.hour}
//           onValueChange={(hour) => updateTime({ hour })}
//         >
//           <SelectTrigger className="w-full button-unactive">
//             <SelectValue placeholder="HH" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {hours?.map((h) => (
//                 <SelectItem key={h} value={h}>
//                   {h}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <span className="text-lg">:</span>

//         <Select
//           value={time.minute}
//           onValueChange={(minute) => updateTime({ minute })}
//         >
//           <SelectTrigger className="w-full button-unactive">
//             <SelectValue placeholder="MM" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {minutes?.map((m) => (
//                 <SelectItem key={m} value={m}>
//                   {m}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {fieldState.error && (
//         <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
//       )}
//     </div>
//   );
// }

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

export default function CustomTimePicker({ name, control, rules }: Props) {
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
  const [time, setTime] = useState({ hour: "", minute: "" });

  // 🔑 REQUIRED SYNC
  useEffect(() => {
    if (dayjs.isDayjs(field.value)) {
      setTime({
        hour: String(field.value.hour()).padStart(2, "0"),
        minute: String(field.value.minute()).padStart(2, "0"),
      });
    }
  }, [field.value]);

  const update = (next: Partial<typeof time>) => {
    setTime((prev) => {
      const value = { ...prev, ...next };

      if (value.hour && value.minute) {
        field.onChange(
          dayjs("1970-01-01").hour(+value.hour).minute(+value.minute).second(0),
        );
      }

      return value;
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Select value={time.hour} onValueChange={(hour) => update({ hour })}>
          <SelectTrigger className="w-full button-unactive">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="text-lg">:</span>

        <Select
          value={time.minute}
          onValueChange={(minute) => update({ minute })}
        >
          <SelectTrigger className="w-full button-unactive">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
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
