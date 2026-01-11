"use client";
import { useState } from "react";
import Invoice from "./Invoice";
import PaymentSystem from "./PaymentSystem";

export default function InvoicePayments({ data }: any) {
  const [selectedTab, setSelectedTab] = useState("invoice");
  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className={`flex-1 py-3 px-4 text-white rounded  transition cursor-pointer ${
            selectedTab === "invoice"
              ? "custom-btn"
              : "py-2 px-4 bg-card rounded  cursor-pointer"
          }`}
          onClick={() => setSelectedTab("invoice")}
        >
          Invoice
        </button>
        <button
          className={`flex-1 py-3 px-4 text-white rounded  transition cursor-pointer ${
            selectedTab === "card"
              ? "custom-btn"
              : "py-2 px-4 bg-card rounded  cursor-pointer"
          }`}
          onClick={() => setSelectedTab("card")}
        >
          Manage Payments
        </button>
      </div>
      {selectedTab === "invoice" && <Invoice data={data} />}
      {selectedTab === "card" && <PaymentSystem />}
    </div>
  );
}
