"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  return (
    <div
      className={`${pathname === "/appointment-create-form" && "w-11"} ${
        pathname === "/login" ? "-top-10 lg:-top-24 " : "-top-10 lg:-top-4"
      } left-0 bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer absolute`}
      onClick={() => history.back()}
    >
      <ArrowLeft />
    </div>
  );
}
