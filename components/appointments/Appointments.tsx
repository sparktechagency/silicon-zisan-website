"use client";
import React, { useState } from "react";
import Status from "./Status";
import AppointmentCards from "./AppointmentCards";

export default function Appointments() {
  const [active, setActive] = useState("Confirmed");

  return (
    <div className="w-[90%]">
      <Status active={active} setActive={setActive} />

      <AppointmentCards />
    </div>
  );
}
