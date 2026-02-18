import React from "react";
import { XCircle, ArrowLeft, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#374859] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-500 rounded-full p-4">
                <XCircle className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Cancelled
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-2">Your payment has been cancelled.</p>
          <p className="text-gray-500 text-sm mb-8">
            No charges have been made to your account.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Try Again Button */}
            <Link
              href="/subscriptions"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              Try Again
            </Link>

            {/* Go Back Button */}
            <Link
              href="/my-jobs"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>

            {/* Home Button */}
            <Link
              href="/"
              className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{" "}
            <Link
              href="/contact-support"
              className="text-red-500 hover:text-red-600 font-medium underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
