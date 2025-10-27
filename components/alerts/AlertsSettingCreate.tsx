"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import Link from "next/link";

export default function AlertsSettingCreate() {
  const [frequency, setFrequency] = useState("daily");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <Container className="bg-card p-6 max-w-md mx-auto rounded-lg space-y-6 border border-gray-400/30 my-10">
      <div className="text-xl font-semibold flex gap-2">
        <CustomBackButton /> Settings
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <Input placeholder="Type Here" className="" />
        </div>
        <div>
          <label className="block mb-1 font-medium">City/Post Code</label>
          <Input placeholder="Type Here" className="" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Push Message</label>
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            <Button
              variant={frequency === "daily" ? "default" : "outline"}
              onClick={() => setFrequency("daily")}
              className={
                frequency === "daily" ? "custom-btn rounded " : "border-white "
              }
            >
              Every Day
            </Button>
            <Button
              variant={frequency === "weekly" ? "default" : "outline"}
              onClick={() => setFrequency("weekly")}
              className={
                frequency === "weekly"
                  ? "custom-btn  "
                  : "border-white rounded-none"
              }
            >
              Weekly
            </Button>
          </div>
          <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Email Address</label>
        <div className="flex items-center justify-between mt-1">
          <Link href="/email-setting">
            <Button className="custom-btn w-40">Email Setting</Button>
          </Link>
          <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Checkbox />
        <p className="text-sm">
          By Continuing, You Accept The{" "}
          <span className="font-semibold">Privacy Policy</span> And{" "}
          <span className="font-semibold">Terms & Conditions</span> of
          JobsinApp.
        </p>
      </div>

      <div className="flex justify-end">
        <Button className="w-[15%] custom-btn mt-4">Submit</Button>
      </div>
    </Container>
  );
}
