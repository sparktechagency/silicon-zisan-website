"use client";

import { useState } from "react";
import { Ban, Settings, Trash, User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import PersonalInformation from "./PersonalInformation";
import EditProfile from "./EditProfile";
import Setting from "./Settings";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import CancelInformation from "./CancelInformation";

const buttons = [
  {
    label: "Personal Information",
    path: "Personal Information",
    icon: <User />,
    bg: "bg-[#1ba1a3]",
    // hover: "hover:bg-[#169091]",
  },
  {
    label: "Cancel Information",
    path: "Cancel Information",
    icon: <Ban />,
    bg: "bg-[#1ba1a3]",
    // hover: "hover:bg-[#169091]",
  },
  {
    label: "Settings",
    path: "Settings",
    icon: <Settings />,
    bg: "bg-[#3a4a5a]",
    hover: "hover:bg-[#324250]",
  },
];
export default function Profile({ data }: { data: any }) {
  const router = useRouter();
  const [status, setStatus] = useState("Personal Information");

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log Out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes ",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("accessToken");
        deleteCookie("role");
        deleteCookie("email");
        deleteCookie("qrcode");
        router.push("/login");
        Swal.fire({
          title: "Logged Out",
          text: "Your have been Log Out.",
          icon: "success",
        });
      }
    });
  };

  // handle delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete Your Account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes ",
    }).then((result) => {
      if (result.isConfirmed) {
        // router.push("/login");
        Swal.fire({
          // title: "Deleted!",
          text: "Your has been Deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="flex flex-col md:flex-row my-16 gap-10 w-full max-w-[1000px] mx-auto px-4 md:px-0">
      <div className="sm:w-88 text-white ">
        {/* Profile Image */}
        {/* <div className="flex justify-center mb-6">
          <Image
            src={profileMan}
            alt="Profile"
            className="w-52 sm:w-auto object-cover"
          />
        </div> */}

        {/* Buttons */}
        <div className="grid grid-cols-1 space-y-4">
          {buttons.map((btn, i) => {
            const active = status === btn.path;
            return (
              <button
                key={i}
                onClick={() => setStatus(btn.label)}
                className={`flex items-center pl-7 cursor-pointer  ${
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

          {/* delete account */}
          <button
            onClick={handleDelete}
            className={`flex items-center pl-7 cursor-pointer bg-card border border-gray-400/50 text-white font-semibold py-3 rounded-lg transition-all`}
          >
            <span className="mr-2 text-nowrap">
              <Trash />
            </span>
            Delete Account
          </button>

          {/* log out */}
          <button
            onClick={handleLogOut}
            className={`flex items-center pl-7 cursor-pointer bg-card border border-gray-400/50 text-white font-semibold py-3 rounded-lg transition-all`}
          >
            <span className="mr-2 text-nowrap">
              <IoIosLogOut size={27} />
            </span>
            Log Out
          </button>
        </div>
      </div>

      {/* conditional components */}
      <div className="w-full">
        {status === "Personal Information" && (
          <PersonalInformation setStatus={setStatus} data={data} />
        )}
        {status === "Edit Profile" && <EditProfile initialData={data} />}

        {status === "Settings" && <Setting />}
        {status === "Cancel Information" && <CancelInformation />}
      </div>
    </div>
  );
}
