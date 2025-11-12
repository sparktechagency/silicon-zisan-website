"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  return (
    <div
      className={`absolute -top-9  lg:-top-3 ${
        pathname === "/login" ? "xl:-top-24" : "xl:-top-3"
      } left-0 bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer`}
      onClick={() => history.back()}
    >
      <ArrowLeft />
    </div>
  );
}
