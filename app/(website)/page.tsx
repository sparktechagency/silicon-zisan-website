import Dashboard from "@/components/dashboard/Dashboard";

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const filters = (await searchParams).name || "My Posted Jobs";

  return <Dashboard searchTerm={filters} />;
}
