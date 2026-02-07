import Sidebar from "./Sidebar";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row  gap-10 w-full max-w-[1000px] mx-auto px-4 md:px-0">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 lg:px-4 max-h-[83vh]">{children}</div>
    </div>
  );
}
