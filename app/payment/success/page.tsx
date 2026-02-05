import React from "react";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const sessionId = (await searchParams)?.session_id;

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Invalid or missing payment session</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-green-500 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-2">Thank you for your payment.</p>
          <p className="text-gray-500 text-sm mb-6">
            Your transaction has been completed successfully.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Download Receipt Button */}
            {/* <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </button> */}

            {/* Go to Dashboard Button */}
            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
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

        {/* Confirmation Email Notice */}
        {/* <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            📧 A confirmation email has been sent to your registered email
            address.
          </p>
        </div> */}

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Questions?{" "}
            <Link
              href="/contact-support"
              className="text-green-500 hover:text-green-600 font-medium underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
