"use client";
import React, { useState } from "react";
import { set } from "zod";
const features = [
  "AI Candidate Matching",
  "CV Screening & Ranking",
  "Job Description Optimization",
  "AI Chat Box",
  "Predictive Analytics",
  "Candidate Engagement",
  "Fraud Verification",
  "Salary & Market Insights",
  "Job Market Trend",
  "Automated Offer Generation",
  "Predictive Hiring Timeline",
];

export default function AITools() {
  const [enabled, setEnabled] = useState(Array(features.length).fill(false));

  const handleToggle = (idx: number) => {
    const newState = [...enabled];
    newState[idx] = !newState[idx];
    setEnabled(newState);
  };

  return (
    <>
      {features?.map((feature, index) => (
        <div className="flex items-center justify-between gap-4 bg-card text-white p-4 rounded-md mb-4">
          <span className="text-sm font-medium">{feature}</span>
          <button
            onClick={() => handleToggle(index)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled[index] ? "bg-[#0288A6]" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-linear-65 from-[#074E5E] to-[#0288A6] transition-transform ${
                enabled[index] ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </>
  );
}
