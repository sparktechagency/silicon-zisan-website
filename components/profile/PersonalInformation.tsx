"use client";
import React, { useEffect } from "react";
// import Image from "next/image";
// import profile from "../../public/profile/avatar.png";
import { Camera } from "lucide-react";
import CustomImage from "@/utils/CustomImage";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import getProfile from "@/utils/getProfile";
import { revalidate } from "@/utils/revalidateTag";
import Link from "next/link";

export default function PersonalInformation({ data }: { data: any }) {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [fileImage, setFileImage] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Data for profile fields
  const profileData = [
    { label: "Name", value: data?.user?.name || data?.companyName || "N/A" },
    { label: "Email", value: data?.user?.email || "N/A" },
    { label: "Contact", value: data?.user.phone || "N/A" },
    { label: "Location", value: data?.user?.address || "N/A" },
    { label: "LegalForm", value: data?.legalForm || "N/A" },
    { label: "TaxNo", value: data?.taxNo || "N/A" },
    { label: "DENo", value: data?.deNo || "N/A" },
    { label: "Category", value: data?.businessCategory || "N/A" },
    { label: "About Company", value: data?.about || "N/A" },
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await myFetch("/users/profile", {
          method: "PATCH",
          body: formData,
        });

        if (response.success) {
          toast.success("Profile image updated successfully");
          await revalidate("users-profile");

          router.refresh();
        } else {
          toast.error(response.message || "Failed to update profile image");
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      setFileImage(res?.image || null);
    };

    fetchProfile();
  }, [previewImage]);

  return (
    <div className="w-full  bg-card p-3 rounded-lg border border-gray-300/30 ">
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-gray-400 mb-6">
        {/* {fileImage ? (
          <CustomImage
            src={fileImage}
            width={100}
            height={100}
            title="Profile"
            className="w-full h-full"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )} */}
        <CustomImage
          src={fileImage}
          // fallback={profile}
          width={100}
          height={100}
          title="Profile"
          className="w-full h-full"
        />
        {/* Camera Icon overlay */}
        <div
          className="absolute bottom-0.5 right-0.5 bg-[#416383] rounded-full p-1 cursor-pointer hover:bg-[#5881a3] transition"
          onClick={handleClick}
        >
          <Camera />

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleImageChange}
            ref={inputRef}
          />
        </div>
      </div>

      {/* Profile Data */}
      <div className="mb-6">
        {profileData.map(({ label, value }, idx) => (
          <div
            key={idx}
            // className="grid grid-cols-[40%_80%] sm:grid-cols-[200px_80%]  py-2 "
          >
            {/* {label === "Name" || label === "Email" || label === "LegalForm" ? (
              <>
                {" "}
                <span className="text-sm w-[20%] notranslate">{label}</span>
                <span className="text-sm w-[80%] notranslate"> : {value}</span>
              </>
            ) : ( */}
            <div className="grid grid-cols-[40%_80%] sm:grid-cols-[200px_80%]  py-2 ">
              {" "}
              <div className="text-sm  ">{label}</div>
              <div className="text-sm "> : {value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="">
        <Link
          href={`/profile/edit-profile`}
          className="custom-btn text-white px-4 py-2 rounded-md"
        >
          Edit Information
        </Link>
      </div>
    </div>
  );
}
