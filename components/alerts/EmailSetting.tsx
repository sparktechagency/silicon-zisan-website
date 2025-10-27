"use client";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { ChevronRight, Settings } from "lucide-react";
import { useState } from "react";
import { EmailModal } from "./EmailModal";

export default function EmailSetting() {
  const [selectMethod, setSelectMethod] = useState("email");
  return (
    <Container className="bg-card p-3 border border-gray-400/30 my-10 rounded">
      <div className="text-xl font-semibold flex gap-2 my-5">
        <CustomBackButton /> Email Setting
      </div>

      <div className="my-3 flex justify-between">
        <h2 className="text-2xl">Select Method</h2>
        <div className="flex gap-3">
          <button
            className={`py-1 px-4 ${
              selectMethod === "email"
                ? "custom-btn rounded"
                : "  rounded border"
            }`}
            onClick={() => setSelectMethod("email")}
          >
            Email
          </button>
          <button
            className={`py-2 px-4 ${
              selectMethod === "push"
                ? "custom-btn rounded"
                : "  rounded border"
            }`}
            onClick={() => setSelectMethod("push")}
          >
            Push Message
          </button>
        </div>
      </div>

      <EmailModal
        trigger={
          <div className="bg-card border rounded flex justify-between p-3 my-8 cursor-pointer">
            <div className="flex gap-3">
              <Settings /> Email Setting
            </div>
            <p>
              <ChevronRight />
            </p>
          </div>
        }
      />
    </Container>
  );
}
