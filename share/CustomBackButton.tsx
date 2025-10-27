"use client";
import { ArrowLeft } from "lucide-react";

export default function CustomBackButton() {
  return (
    <div>
      <button
        className="bg-card rounded-full button-unactive w-8 h-8 flex items-center justify-center"
        onClick={() => history.back()}
      >
        <ArrowLeft />
      </button>
    </div>
  );
}
