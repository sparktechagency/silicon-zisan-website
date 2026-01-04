import { useEffect, useState } from "react";
import dayjs from "dayjs";

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

type Props = {
  value?: dayjs.Dayjs | null;
  onChange: (time: dayjs.Dayjs | null) => void;
};

export default function HourMinutePicker({ value, onChange }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [hour, setHour] = useState<string>(""); // store as string for select
  const [minute, setMinute] = useState<string>("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync internal state with value
  useEffect(() => {
    if (value) {
      setHour(String(value.hour()).padStart(2, "0"));
      setMinute(String(value.minute()).padStart(2, "0"));
    } else {
      setHour("");
      setMinute("");
    }
  }, [value]);

  const handleHourChange = (hStr: string) => {
    setHour(hStr);
    const h = Number(hStr);
    const m = Number(minute) || 0;
    if (!isNaN(h)) {
      onChange(
        value
          ? value.hour(h).minute(m).second(0)
          : dayjs().hour(h).minute(m).second(0)
      );
    }
  };

  const handleMinuteChange = (mStr: string) => {
    setMinute(mStr);
    const h = Number(hour) || 0;
    const m = Number(mStr);
    if (!isNaN(m)) {
      onChange(
        value
          ? value.hour(h).minute(m).second(0)
          : dayjs().hour(h).minute(m).second(0)
      );
    }
  };

  return (
    <div className="w-auto rounded button-unactive bg-card shadow-sm">
      <div className="flex items-center justify-center gap-3">
        {/* Hour Dropdown */}
        <div className="relative w-1/2">
          <select
            value={hour}
            onChange={(e) => handleHourChange(e.target.value)}
            className="w-full appearance-none rounded-lg border-none bg-card px-4 py-2 text-center text-white outline-none transition focus:border-none"
          >
            <option value="">{isMobile ? "H" : "Hours"}</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <span className="text-lg font-semibold text-white">:</span>

        {/* Minute Dropdown */}
        <div className="relative w-1/2">
          <select
            value={minute}
            onChange={(e) => handleMinuteChange(e.target.value)}
            className="w-full appearance-none rounded-lg border-none bg-card px-4 py-2 text-center text-white outline-none transition focus:border-none"
          >
            <option value="">{isMobile ? "M" : "Minutes"}</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
