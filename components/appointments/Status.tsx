"use client";

export default function Status({ active, setActive }: any) {
  const tabs = ["Confirmed", "Pending", "Cancelled", "Create New"];

  return (
    <div className="">
      <div className="grid  grid-cols-2 2xl:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`py-2 px-6 md:py-3 rounded-md font-medium text-sm transition-all duration-300  xl:text-xl 
              ${active === tab ? "btn " : "bg-[#415161] text-white shadow-md"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
