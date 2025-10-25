import React from "react";

export default function PackeageType({
  type,
  setType,
}: {
  type: string;
  setType: Function;
}) {
  return (
    <div className="flex gap-4">
      <button
        className={`${
          type === "day"
            ? "custom-btn rounded px-3 py-1"
            : "border rounded py-1 px-3"
        }`}
        onClick={() => setType("day")}
      >
        Day
      </button>
      <button
        className={`${
          type === "month"
            ? "custom-btn rounded px-3 py-1"
            : "border rounded py-1 px-3"
        }`}
        onClick={() => setType("month")}
      >
        Month
      </button>
      <button
        className={`${
          type === "year"
            ? "custom-btn rounded px-3 py-1"
            : "border rounded py-1 px-3"
        }`}
        onClick={() => setType("year")}
      >
        Year
      </button>
    </div>
  );
}
