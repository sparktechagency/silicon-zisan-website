"use client";

import { useState, JSX } from "react";
import { Trash, User, UserCheck, Settings } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import PersonalInformation from "./PersonalInformation";
import EditProfile from "./EditProfile";
import Setting from "./Settings";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import MySubscription from "./MySubscription";

const buttons = [
  {
    label: "Personal Information",
    icon: <User />,
    bg: "bg-[#1ba1a3]",
  },
  {
    label: "My Subscription",
    icon: <UserCheck />,
    bg: "bg-[#1ba1a3]",
  },
  {
    label: "Settings",
    icon: <Settings />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
];

export default function Profile({ data }: { data: any }) {
  const router = useRouter();
  const [status, setStatus] = useState("Personal Information");

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

  // Map status to component
  const componentMap: { [key: string]: JSX.Element } = {
    "Personal Information": (
      <PersonalInformation setStatus={setStatus} data={data} />
    ),
    "Edit Profile": <EditProfile initialData={data} />,
    Settings: <Setting />,
    "My Subscription": <MySubscription />,
  };

  return (
    <div className="flex flex-col md:flex-row my-16 gap-10 w-full max-w-[1000px] mx-auto px-4 md:px-0">
      {/* Sidebar */}
      <div className="sm:w-88 text-white">
        <div className="grid grid-cols-1 gap-4">
          {buttons.map((btn, i) => {
            const active = status === btn.label;
            return (
              <button
                key={i}
                onClick={() => setStatus(btn.label)}
                className={`flex items-center pl-7 cursor-pointer font-semibold py-3 rounded-lg transition-all text-white ${
                  active ? "custom-btn" : "bg-card border border-gray-400/50"
                } ${btn.hover || ""}`}
              >
                <span className="mr-2">{btn.icon}</span>
                {btn.label}
              </button>
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

      {/* Main Content */}
      <div className="w-full">{componentMap[status]}</div>
    </div>
  );
}
