import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Link href="/subscriptions">
      {" "}
      <div className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        Go to Dashboard
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
