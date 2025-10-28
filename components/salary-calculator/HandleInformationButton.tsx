"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function HandleInformationButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const handleInformation = () => {
    params.set("name", "Information");
    router.push(`?${params.toString()}`);
  };
  return (
    <div>
      <Button
        onClick={handleInformation}
        className="w-full py-3 rounded custom-btn transition"
      >
        More Information
      </Button>
    </div>
  );
}
