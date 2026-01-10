import Profile from "@/components/profile/Profile";
import getProfile from "@/utils/getProfile";
import React from "react";

export default async function ProfilePage() {
  const profileData = await getProfile();

  return (
    <div>
      <Profile data={profileData} />
    </div>
  );
}
