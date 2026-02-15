"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

export default function HireEmployeeButton({ data }: any) {
  const [loading, setLoading] = useState(false);
  const handleHiring = async () => {
    if (loading) return;
    const loadingToastId = toast.loading("Processing your request...", {
      id: "hiring-toast",
    });

    setLoading(true);

    try {
      const res = await myFetch(`/jobs/send-hiring-post/${data?._id}`, {
        method: "POST",
      });

      if (res?.success) {
        toast?.success(res.message || "Request sent successfully", {
          id: loadingToastId,
        });
        // window.location.reload();
      } else {
        const err = (res as any)?.error?.[0].message;

        toast.error(
          typeof err === "string"
            ? err
            : err?.message || "Something went wrong",
          { id: loadingToastId },
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while sending shift plan.",
        { id: loadingToastId },
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      //   disabled={loading}
      onClick={handleHiring}
      className="w-full sm:w-[48%] custom-btn"
    >
      Send
    </Button>
  );
}
