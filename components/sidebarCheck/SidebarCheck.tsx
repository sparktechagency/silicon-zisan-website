"use client";

import Sidebar2 from "../dashboard/Sidebar2";
import { usePathname } from "next/navigation";

export default function SidebarCheck() {
  const pathname = usePathname();

  const hideSidebarRoutes = [
    "/alerts",
    "/profile",
    "/subscriptions",
    "/inbox",
    "/create-new-plan",
    "/applied-jobs", // base path for dynamic routes
    "/view-details-person",
    "/view-profile",
    "/factor-authenticaiton",
    "/alert-setting",
    "/authentication-app",
  ];

  const shouldHideSidebar = hideSidebarRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return <>{!shouldHideSidebar && <Sidebar2 />}</>;
}
