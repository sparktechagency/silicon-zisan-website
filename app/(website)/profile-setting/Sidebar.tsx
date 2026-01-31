"use client";

import { Trash, User, UserCheck, Settings } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";

import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import Link from "next/link";

const buttons = [
  {
    label: "Personal Information",
    icon: <User />,
    bg: "bg-[#1ba1a3]",
    path: "/profile",
  },
  {
    label: "My Subscription",
    icon: <UserCheck />,
    bg: "bg-[#1ba1a3]",
    path: "/profile/my-subscription",
  },
  {
    label: "Settings",
    icon: <Settings />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
    path: "/profile/my-settings",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // current route

  // Logout handler
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("accessToken");
        deleteCookie("role");
        deleteCookie("email");
        deleteCookie("qrcode");

        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out.",
          icon: "success",
        }).then(() => {
          router.push("/login");
        });
      }
    });
  };

  // Delete account placeholder
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: call API to delete account
        Swal.fire({
          text: "Your account has been deleted.",
          icon: "success",
        }).then(() => {
          router.push("/login");
        });
      }
    });
  };

  return (
    <div className="sm:w-88 text-white">
      <div className="grid grid-cols-1 gap-4">
        {buttons.map((btn, i) => {
          const active = pathname.startsWith(btn.path);
          return (
            <Link
              href={btn.path}
              key={i}
              className={`flex items-center pl-7 cursor-pointer font-semibold py-3 rounded-lg transition-all text-white ${
                active ? "custom-btn" : "bg-card border border-gray-400/50"
              } ${btn.hover || ""}`}
            >
              <span className="mr-2">{btn.icon}</span>
              {btn.label}
            </Link>
          );
        })}

        {/* Delete Account */}
        <button
          onClick={handleDelete}
          className="flex items-center pl-7 cursor-pointer bg-card border border-gray-400/50 text-white font-semibold py-3 rounded-lg transition-all"
        >
          <span className="mr-2">
            <Trash />
          </span>
          Delete Account
        </button>

        {/* Log Out */}
        <button
          onClick={handleLogOut}
          className="flex items-center pl-7 cursor-pointer bg-card border border-gray-400/50 text-white font-semibold py-3 rounded-lg transition-all"
        >
          <span className="mr-2">
            <IoIosLogOut size={24} />
          </span>
          Log Out
        </button>
      </div>
    </div>
  );
}
