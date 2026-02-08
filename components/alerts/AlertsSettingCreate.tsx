/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Input } from "../ui/input";
import Link from "next/link";

type CheckedState = boolean | "indeterminate";

export default function AlertsSettingCreate({ data }: any) {
  /* ---------------- STATES ---------------- */
  const [frequency, setFrequency] = useState("");
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [accepted, setAccepted] = useState<CheckedState>(false);
  const [email, setEmail] = useState("");

  /* ---------------- SYNC ASYNC DATA ---------------- */
  useEffect(() => {
    if (data?.notificationSettings) {
      setPushEnabled(Boolean(data.notificationSettings.pushNotification));
      setEmailEnabled(Boolean(data.notificationSettings.emailNotification));
      setFrequency(data.notificationSettings.repeat || "");
    }

    if (data?.user?.email) {
      setEmail(data.user.email);
    }
  }, [data]);

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handlePushNotification = async () => {
    if (!accepted) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    if (!frequency) {
      toast.error("Please select notification frequency");
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
      const res = await myFetch("/employers/me", {
        method: "PATCH",
        body: {
          notificationSettings: {
            pushNotification: Boolean(pushEnabled),
            emailNotification: Boolean(emailEnabled),
            repeat: frequency,
            email,
          },
        },
      });

      if (res?.success) {
        toast.success(res.message || "Settings updated");
      } else {
        toast.error((res as any)?.error[0].message || "Update failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Container className="bg-card p-6 max-w-md mx-auto rounded-lg space-y-6 border border-gray-400/30 my-16">
      <div className="text-xl font-semibold flex gap-2">
        <CustomBackButton /> Settings
      </div>

      {/* PUSH */}
      <div className="space-y-2">
        <label className="font-medium">Push Message</label>
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-2">
            <Button
              variant={frequency === "Daily" ? "default" : "outline"}
              onClick={() => setFrequency("Daily")}
              className={frequency === "Daily" ? "custom-btn" : "border-white"}
            >
              Every Day
            </Button>

            <Button
              variant={frequency === "Weekly" ? "default" : "outline"}
              onClick={() => setFrequency("Weekly")}
              className={frequency === "Weekly" ? "custom-btn" : "border-white"}
            >
              Weekly
            </Button>
          </div>

          <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
        </div>
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="font-medium">Email Address</label>
        <div className="flex items-center justify-between mt-1">
          <Input
            className="w-80"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </div>

      {/* TERMS */}
      <div className="flex items-center gap-2 pt-4">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        <p className="text-sm">
          By Continuing, You Accept The{" "}
          <Link href="/privacy-policy" className="font-semibold underline">
            Privacy Policy
          </Link>{" "}
          And{" "}
          <Link href="/terms-condition" className="font-semibold underline">
            Terms & Conditions
          </Link>
        </p>
      </div>

      <div className="flex justify-end">
        <Button className="custom-btn mt-4" onClick={handlePushNotification}>
          Submit
        </Button>
      </div>
    </Container>
  );
}
