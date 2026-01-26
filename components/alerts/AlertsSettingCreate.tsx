"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Input } from "../ui/input";
type CheckedState = boolean | "indeterminate";

export default function AlertsSettingCreate() {
  const [frequency, setFrequency] = useState("");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [accepted, setAccepted] = useState<CheckedState>(false);
  const [email, setEmail] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handlePushNotification = async () => {
    if (!accepted) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    if (!frequency) {
      toast.error("Please select notification push message");
      return;
    }

    if (!emailEnabled && !pushEnabled) {
      toast.error("Please enable at least one notification method");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailEnabled && !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const res = await myFetch(`/employers/me`, {
        method: "PATCH",
        body: {
          notificationSettings: {
            pushNotification: pushEnabled,
            emailNotification: emailEnabled,
            repeat: frequency,
            email,
          },
        },
      });

      if (res.success) {
        toast.success(res.message);
        setFrequency("");
        setEmail("");
      } else {
        toast.error((res as any)?.error?.[0]?.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Container className="bg-card p-6 max-w-md mx-auto rounded-lg space-y-6 border border-gray-400/30 my-16">
      <div className="text-xl font-semibold flex gap-2">
        <CustomBackButton /> Settings
      </div>

      <div className="space-y-2">
        <label className="font-medium">Push Message</label>
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            <Button
              variant={frequency === "Daily" ? "default" : "outline"}
              onClick={() => setFrequency("Daily")}
              className={
                frequency === "Daily" ? "custom-btn rounded " : "border-white "
              }
            >
              Every Day
            </Button>
            <Button
              variant={frequency === "Weekly" ? "default" : "outline"}
              onClick={() => setFrequency("Weekly")}
              className={
                frequency === "Weekly" ? "custom-btn " : "border-white rounded"
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
          <Input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-100"
          />

          <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        <p className="text-sm">
          By Continuing, You Accept The{" "}
          <span className="font-semibold">Privacy Policy</span> And{" "}
          <span className="font-semibold">Terms & Conditions</span> of
          JobsinApp.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          className="sm:w-[15%] custom-btn mt-4"
          onClick={handlePushNotification}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}
