"use client";
import { useState } from "react";
import InformationOne from "./InformationOne";
import { Info } from "lucide-react";
import InformationTwo from "./informationTwo";

export default function SalaryDetails() {
  const [role, setRole] = useState("Employee");

  const data = [
    { id: 1, label: "Gross Salary", month: 3000, year: 36000 },
    { id: 2, label: "Pension Insurance (18.6%)", month: 279, year: 3348 },
    { id: 3, label: "Unemployment Insurance (2.5%)", month: 38, year: 456 },
    { id: 4, label: "Care Insurance (3.6%)", month: 54, year: 648 },
    { id: 5, label: "Health Insurance (17.7%)", month: 369, year: 4428 },
    {
      id: 6,
      label: "Total Social Expenses",
      month: 1110,
      year: 13328,
      isTotal: true,
    },
  ];

  const data2 = [
    { id: 7, label: "Payroll Tax", month: 369, year: 4428 },
    { id: 8, label: "Solidarity Surcharge", month: 279, year: 3348 },
    { id: 9, label: "Church Tax", month: 369, year: 4428 },
    { id: 10, label: "Total Taxes", month: 1017, year: 12204, isTotal: true },
    { id: 11, label: "Net", month: 2561, year: 30732, isNet: true },
  ];

  return (
    <div>
      {role === "Employee" && <InformationOne data={data} data2={data2} />}
      {role === "Employer" && <InformationTwo data={data} />}

      {/* Role Toggle */}
      <div
        className={`flex justify-center gap-4 my-8 ${
          role === "Employer" && "pt-40"
        }`}
      >
        <div className="border p-2 w-auto rounded-3xl  gap-2">
          {["Employee", "Employer"].map((status: any) => (
            <button
              key={status}
              onClick={() => setRole(status)}
              className={`w-auto py-2 px-6 rounded-2xl transition cursor-pointer ${
                role === status ? "custom-btn" : "bg-transparent"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="flex items-center justify-center gap-4">
        <p>
          <Info />
        </p>
        <p className="text-xs text-[#FFFFFF] text-center">
          The output is without U1/U2/U3 and BG-Verkehr. <br /> The output is
          according to German law.
        </p>
      </div>
    </div>
  );
}
