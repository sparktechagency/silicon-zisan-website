"use client";

import Image from "next/image";
import profileMan from "../../public/profile/profile.png";
import { useState } from "react";
import { Settings, Trash, User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { stat } from "fs";
import PersonalInformation from "./PersonalInformation";
import EditProfile from "./EditProfile";
import Container from "@/share/Container";

const buttons = [
  {
    label: "Personal Information",
    icon: <User />,
    bg: "bg-[#1ba1a3]",
    hover: "hover:bg-[#169091]",
  },
  {
    label: "Settings",
    icon: <Settings />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
  {
    label: "Log Out",
    icon: <IoIosLogOut size={27} />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
  {
    label: "Delete Account",
    icon: <Trash />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#9e2d2d]",
  },
];
export default function Profile() {
  const [status, setStatus] = useState("");
  return (
    <div className="flex mt-10 gap-10 w-[50%] mx-auto">
      <div className="w-88 text-white ">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Image src={profileMan} alt="Profile" className=" object-cover" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          {buttons.map((btn, i) => {
            const active = status === btn.label;
            return (
              <button
                key={i}
                onClick={() => setStatus(btn.label)}
                className={`flex items-center pl-7 ${
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

        {/* conditional components */}
      </div>

      {/* conditional components */}
      <div className="w-full">
        {status === "Personal Information" && (
          <PersonalInformation setStatus={setStatus} />
        )}
        {status === "Edit Profile" && <EditProfile />}
      </div>
    </div>
  );
}
