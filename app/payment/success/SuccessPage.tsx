"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const handleDashboard = () => {
    router.push("/subscriptions");
    window.location.reload();
  };
  return (
    <div
      onClick={handleDashboard}
      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
    >
      Go to Dashboard
      <ArrowRight className="w-5 h-5" />
    </div>
  );
}
