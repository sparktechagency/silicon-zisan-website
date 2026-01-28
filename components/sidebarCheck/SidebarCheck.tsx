"use client";

import Sidebar2 from "../dashboard/Sidebar2";
import { usePathname } from "next/navigation";

export default function SidebarCheck() {
  const pathname = usePathname(); // gets current path
  const paths = ["/alerts", "/profile", "/subscriptions", "/inbox"];
  const allowed = paths?.find((p) => p.includes(pathname));

  return <>{allowed !== pathname && <Sidebar2 />}</>;
}
