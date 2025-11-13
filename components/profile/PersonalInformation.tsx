"use client";
import React from "react";
import Image from "next/image"; // or <img> if not using Next.js
import profileMan from "../../public/profile/profile.png";
import { Camera } from "lucide-react";
// Data for profile fields
const profileData = [
  { label: "Name", value: "Kamran Khan" },
  { label: "Email", value: "Kamran@Gmail.Com" },
  { label: "Contact", value: "+1524623256656" },
  { label: "Location", value: "Dhaka Bangladesh" },
];

export default function PersonalInformation({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-card p-5 rounded-lg border border-gray-300/30 ">
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-gray-400 mb-6">
        <Image
          src={previewImage || profileMan}
          width={10}
          height={10}
          alt="Profile"
          className="object-cover w-full h-full"
          sizes="100vh"
          // priority
        />
        {/* Camera Icon overlay */}
        <div
          className="absolute bottom-0.5 right-0.5 bg-[#416383] rounded-full p-1 cursor-pointer hover:bg-[#5881a3] transition"
          onClick={handleClick}
        >
          <Camera />

          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            ref={inputRef}
          />
        </div>
      </div>

      {/* Profile Data */}
      <div className="mb-6">
        {profileData.map(({ label, value }, idx) => (
          <div key={idx} className="grid grid-cols-2 py-2 ">
            <span className="text-sm font-">{label}</span>
            <span className="text-sm">: {value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          className="custom-btn text-white px-4 py-2 rounded-md"
          onClick={() => setStatus("Edit Profile")}
        >
          Edit Information
        </button>
        {/* <button
          className="flex-1 custom-btn text-white py-2 px-4 rounded-md "
          onClick={() => setStatus("Complete Profile")}
        >
          Complete Profile
        </button> */}
      </div>
    </div>
  );
}
