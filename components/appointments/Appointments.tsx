"use client";
import Status from "./Status";
import AppointmentCardsConfirmed from "./AppointmentCardsConfirmed";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "@/utils/myFetch";

export const dynamic = "dynamic-force";

export default function Appointments() {
  const params = useSearchParams();
  const status = params.get("status");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch(`/appointments/requests/me?status=${status}`);
      setData(res?.data);
    };
    fetchData();
  }, [status]);

  return (
    <div className="md:w-[90%]">
      <Status />
      <AppointmentCardsConfirmed data={data} />
    </div>
  );
}
