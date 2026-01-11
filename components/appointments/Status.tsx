"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Status() {
  const tabs = ["Confirmed", "Pending", "Cancelled", "Completed"];

  const router = useRouter();
  const searchParams = useSearchParams();

  const activeStatus = searchParams.get("status");

  const handleClick = (tab: string) => {
    if (tab === "Create New") {
      router.replace("/appointment-create-form");
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    const currentName = params.get("name");
    if (currentName === "Appointments") {
      params.set("status", tab);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab;

          return (
            <button
              key={tab}
              onClick={() => handleClick(tab)}
              className={`py-2 px-6 md:py-3 rounded-md font-medium text-sm transition-all duration-300 xl:text-xl cursor-pointer
                ${
                  isActive && tab !== "Create New"
                    ? "btn"
                    : "bg-[#415161] text-white shadow-md"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
