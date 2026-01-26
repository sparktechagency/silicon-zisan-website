import Profile from "@/components/profile/Profile";
import { myFetch } from "@/utils/myFetch";

export default async function ProfilePage() {
  const profileData = await myFetch("/employers/me", {
    tags: ["profile"],
  });

  return (
    <>
      <Profile data={profileData?.data} />
    </>
  );
}
