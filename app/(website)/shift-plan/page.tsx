"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShiftPlan from "@/components/shift-plan/ShiftPlan";
import { myFetch } from "@/utils/myFetch";

export default function ShiftPlanpage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const shift = searchParams.get("shift") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const params = new URLSearchParams();
    if (shift) params.set("shift", shift);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const url = params.toString()
      ? `/shift-plans/me?${params.toString()}`
      : `/shift-plans/me`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await myFetch(url);
        setData(res?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="relative">
      {/* Keep component mounted */}
      <ShiftPlan data={data} />

      {/* Optional subtle loading indicator */}
      {loading && (
        <div className="absolute inset-0  flex items-center justify-center">
          <p className="text-sm"></p>
        </div>
      )}
    </div>
  );
}
