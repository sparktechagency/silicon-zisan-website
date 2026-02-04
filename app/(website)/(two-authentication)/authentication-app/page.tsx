import AuthenticationApp from "@/components/profile/AuthenticationApp";
import getProfile from "@/utils/getProfile";

export default async function AuthenticationPage() {
  const getprofile = await getProfile();
  return (
    <>
      <AuthenticationApp getprofile={getprofile} />
    </>
  );
}
