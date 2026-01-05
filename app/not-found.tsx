"use client";

import { useEffect } from "react";

type ErrorProps = {
  error?: Error;
  reset?: () => void;
};

export default function NotFound({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold text-red-400">
        Something went wrong!
      </h2>

      <p className="text-sm text-gray-500">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
