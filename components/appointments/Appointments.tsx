"use client";
import React, { useState } from "react";
import Status from "./Status";
import AppointmentCardsConfirmed from "./AppointmentCardsConfirmed";
import AppointmentCardsCancelled from "./AppointmentCardsCancelled";
import AppointmentCardsPending from "./AppointmentCardsPending";
import { CreateForm } from "./CreateForm";

export default function Appointments() {
  const [status, setStatus] = useState("Confirmed");

  return (
    <div className="w-[90%]">
      <Status active={status} setActive={setStatus} />

      {status === "Confirmed" && <AppointmentCardsConfirmed />}
      {status === "Pending" && <AppointmentCardsPending />}
      {status === "Cancelled" && <AppointmentCardsCancelled />}
      {status === "Create New" && <CreateForm />}
    </div>
  );
}
