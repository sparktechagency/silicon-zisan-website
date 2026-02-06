"use client";

import Link from "next/link";

import Container from "@/share/Container";
import { gradientClasses } from "@/styles/gradients";

export default function NotFound() {
  return (
    <div
      className={`${gradientClasses.primaryBg} min-h-screen py-16 px-4 flex items-center`}
    >
      <Container>
        <div className="flex flex-col items-center justify-center text-center">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">
            <span className="inline-block">4</span>
            <span className="inline-block mx-2 text-teal-400">0</span>
            <span className="inline-block">4</span>
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-gray-300 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Illustration - Simple SVG */}
          <div className="mb-8">
            <svg
              width="180"
              height="120"
              viewBox="0 0 180 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M90 20C125.899 20 155 49.1015 155 85C155 120.899 125.899 150 90 150C54.1015 150 25 120.899 25 85C25 49.1015 54.1015 20 90 20Z"
                fill="#1E293B"
                stroke="#0D9488"
                strokeWidth="2"
              />
              <path
                d="M65 70C65 73.866 61.866 77 58 77C54.134 77 51 73.866 51 70C51 66.134 54.134 63 58 63C61.866 63 65 66.134 65 70Z"
                fill="#0D9488"
              />
              <path
                d="M129 70C129 73.866 125.866 77 122 77C118.134 77 115 73.866 115 70C115 66.134 118.134 63 122 63C125.866 63 129 66.134 129 70Z"
                fill="#0D9488"
              />
              <path
                d="M58 105C58 105 70 90 90 90C110 90 122 105 122 105"
                stroke="#0D9488"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Return Home Button */}
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-teal-500 to-slate-700 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
          >
            Return to Homepage
          </Link>
        </div>
      </Container>
    </div>
  );
}
