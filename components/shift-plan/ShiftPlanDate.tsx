import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";

export default function ShiftPlanDate({
  selectedDates,
  setSelectedDates,
}: any) {
  const currentMonth = new Date(2026, 0); // January 2026
  const startDate = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 0,
  });
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const toggleDate = (date: any) => {
    const exists = selectedDates.some((d: any) => isSameDay(d, date));
    if (exists) {
      setSelectedDates(selectedDates.filter((d: any) => !isSameDay(d, date)));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className="bg-card text-white p-4 rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-3">November 2026 </h2>
      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-300">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const isSelected = selectedDates.some((d: any) => isSameDay(d, date));
          return (
            <button
              key={index}
              onClick={() => toggleDate(date)}
              className={`py-2 rounded ${
                isSelected ? "custom-btn" : "text-gray-200 hover:bg-gray-700"
              }`}
            >
              {format(date, "d")}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button className="px-4 py-2  rounded border">Cancel</button>
        <button className="px-4 py-2  rounded border">Ok</button>
        <button className="px-4 py-2  rounded border">Add</button>
      </div>
    </div>
  );
}
