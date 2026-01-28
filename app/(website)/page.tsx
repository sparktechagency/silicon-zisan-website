// import Dashboard from "@/components/dashboard/Dashboard";

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: { name: string };
// }) {
//   const filters = (await searchParams).name || "My Jobs";

//   return <Dashboard searchTerm={filters} />;
// }
import JobPostHomePage from "@/components/job-details/JobPostHomePage";
import React from "react";

export default function page() {
  return (
    <div>
      <JobPostHomePage />
    </div>
  );
}
