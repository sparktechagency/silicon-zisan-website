"use client";
import { useState } from "react";
import Status from "./Status";
import AppointmentCardsConfirmed from "./AppointmentCardsConfirmed";
import AppointmentCardsCancelled from "./AppointmentCardsCancelled";
import AppointmentCardsPending from "./AppointmentCardsPending";

export const dynamic = "dynamic-force";

export default function Appointments() {
  const [status, setStatus] = useState("Confirmed");

  return (
    <div className="md:w-[90%]">
      <Status active={status} setActive={setStatus} />

      {status === "Confirmed" && <AppointmentCardsConfirmed />}
      {status === "Pending" && <AppointmentCardsPending />}
      {status === "Cancelled" && <AppointmentCardsCancelled />}
    </div>
  );
}
