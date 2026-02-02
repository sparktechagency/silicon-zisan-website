import TwoFactorAuth from "@/components/profile/Authtication";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function FactorAuthenticaiton() {
  const res = await myFetch("/users/profile");
  return (
    <>
      <TwoFactorAuth getProfile={res?.data} />
    </>
  );
}
