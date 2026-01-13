import TwoFactorAuth from "@/components/profile/Authtication";
import getProfile from "@/utils/getProfile";
import React from "react";

export default async function FactorAuthenticaiton() {
  const data = await getProfile();
  return (
    <div>
      <TwoFactorAuth initialData={data} />
    </div>
  );
}
