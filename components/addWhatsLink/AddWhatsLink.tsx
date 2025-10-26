import React from "react";
import { Input } from "../ui/input";

export default function AddWhatsLink() {
  return (
    <div className="bg-card rounded p-5 border border-gray-300/30">
      <h1 className="capitalize text-2xl font-semibold mb-2">
        add whatsapp link
      </h1>

      <Input placeholder="Enter Whatsapp link" />

      <button className="custom-btn mt-5 rounded w-full py-2">Save</button>
    </div>
  );
}
