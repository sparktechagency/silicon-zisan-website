"use client";
import { Switch } from "@/components/ui/switch";
import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TwoFactorAuth({ initialData }: { initialData?: any }) {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    initialData?.is2FAEmailActive || false
  );
  const router = useRouter();

  const handleToggle = async (checked: boolean) => {
    setIsTwoFactorEnabled(checked);
    try {
      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: { is2FAEmailActive: checked },
      });

      if (res.success) {
        toast.success(
          checked ? "2FA enabled successfully" : "2FA disabled successfully"
        );
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update 2FA status");
        setIsTwoFactorEnabled(!checked); // Revert on failure
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setIsTwoFactorEnabled(!checked); // Revert on error
    }
  };

  return (
    <Container className="px-10 md:px-40 space-y-6 my-16">
      <div className="flex gap-2 items-center">
        <div>
          <button
            className="bg-card rounded-full button-unactive w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => router.push("/profile")}
          >
            <ArrowLeft size={18} />
          </button>
        </div>
        <h2 className="text-xl font-semibold">2 Factor Authentication</h2>
      </div>

      <div className="bg-card p-6 rounded-lg space-y-4 border border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium">
            Turn on two factor authentication
          </p>
          <Switch checked={isTwoFactorEnabled} onCheckedChange={handleToggle} />
        </div>
        <p className="text-sm text-gray-400">
          Every time user logs in, there will be a verification code sent to the
          email and it have to verify to login.
        </p>
      </div>
    </Container>
  );
}
