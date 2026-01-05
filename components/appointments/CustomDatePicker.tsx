import { useEffect, useState } from "react";
const hours = [
  ...Array.from({ length: 23 }, (_, i) => String(i + 1).padStart(2, "0")),
  "00",
];
const minutes = [
  ...Array.from({ length: 59 }, (_, i) => String(i + 1).padStart(2, "0")),
  "00",
];

export default function CustomDatePicker() {
  const [selectedHour, setSelectedHour] = useState<null | number>(null);
  const [selectedMinute, setSelectedMinute] = useState<null | number>(null);

  // const setNow = () => {
  //   const now = new Date();
  //   setSelectedHour(now.getHours()); // returns 0–23
  //   setSelectedMinute(now.getMinutes()); // returns 0–59
  // };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-auto rounded button-unactive bg-card shadow-sm">
      {/* <label className="block mb-2 text-sm font-medium text-gray-700">
        Select Time
      </label> */}

      <div className="flex items-center justify-center gap-3">
        {/* Hour Dropdown */}
        <div className="relative w-1/2">
          <select
            value={selectedHour ?? ""}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
            className="w-full appearance-none rounded-lg border-none bg-card px-4 py-2 text-center text-white outline-none transition  focus:border-none"
          >
            <option value="">{isMobile ? "H" : "Hours"}</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {String(h).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <span className="text-lg font-semibold text-white">:</span>

        {/* Minute Dropdown */}
        <div className="relative w-1/2">
          <select
            value={selectedMinute ?? ""}
            onChange={(e) => setSelectedMinute(Number(e.target.value))}
            className="w-full appearance-none rounded-lg border-none bg-card px-4 py-2 text-center text-white outline-none transition  focus:border-none"
          >
            <option value="">{isMobile ? "M" : "Minutes"}</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
