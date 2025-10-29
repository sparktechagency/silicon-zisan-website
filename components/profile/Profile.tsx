"use client";

import Image from "next/image";
import profileMan from "../../public/profile/profile.png";
import { useState } from "react";
import { Settings, Trash, User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import PersonalInformation from "./PersonalInformation";
import EditProfile from "./EditProfile";
import Setting from "./Settings";
import { useRouter } from "next/navigation";

const buttons = [
  {
    label: "Personal Information",
    path: "Personal Information",
    icon: <User />,
    bg: "bg-[#1ba1a3]",
    hover: "hover:bg-[#169091]",
  },
  {
    label: "Settings",
    path: "Settings",
    icon: <Settings />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
  {
    label: "Log Out",
    path: "/login",
    icon: <IoIosLogOut size={27} />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
  {
    label: "Delete Account",
    path: "/login",
    icon: <Trash />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#9e2d2d]",
  },
];
export default function Profile() {
  const router = useRouter();
  const [status, setStatus] = useState("Personal Information");
  return (
    <div className="flex flex-col md:flex-row my-16 gap-10 w-full max-w-[1000px] mx-auto px-10 md:px-0">
      <div className="w-88 text-white ">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Image src={profileMan} alt="Profile" className=" object-cover" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          {buttons.map((btn, i) => {
            const active = status === btn.path;
            return (
              <button
                key={i}
                onClick={() => {
                  if (btn.path === "/login") {
                    router.push(btn.path);
                  } else {
                    setStatus(btn.label);
                  }
                }}
                className={`flex items-center pl-7 cursor-pointer ${
                  active ? "custom-btn" : "bg-card border border-gray-400/50"
                } ${
                  btn.hover
                } text-white font-semibold py-3 rounded-lg transition-all`}
              >
                <span className="mr-2 text-nowrap">{btn.icon}</span>
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* conditional components */}
      <div className="w-full">
        {status === "Personal Information" && (
          <PersonalInformation setStatus={setStatus} />
        )}
        {status === "Edit Profile" && <EditProfile />}
        {status === "Complete Profile" && (
          <EditProfile title="Complete Profile" />
        )}

        {status === "Settings" && <Setting />}
      </div>
    </div>
  );
}
