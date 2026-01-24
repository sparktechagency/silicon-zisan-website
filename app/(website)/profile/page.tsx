import Profile from "@/components/profile/Profile";
import { myFetch } from "@/utils/myFetch";

export default async function ProfilePage() {
  const profileData = await myFetch("/employers/me", {
    tags: ["profile"],
  });

  console.log("profile data", profileData);

  return (
    <>
      <Profile data={profileData?.data} />
    </>
  );
}
