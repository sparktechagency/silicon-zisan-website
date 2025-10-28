"use client";

export default function Status({ active, setActive }: any) {
  const tabs = ["Confirmed", "Pending", "Cancelled", "Create New"];

  return (
    <div className="">
      <div className="flex  justify-between space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-300  xl:text-xl 
              ${active === tab ? "btn " : "bg-[#415161] text-white shadow-md"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
