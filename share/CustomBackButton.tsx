"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomBackButton() {
  const router = useRouter();

  return (
    <button
      className="bg-card rounded-full button-unactive w-8 h-8 flex items-center justify-center cursor-pointer"
      onClick={() => router.back()}
      aria-label="Go back"
    >
      <ArrowLeft size={16} />
    </button>
  );
}
