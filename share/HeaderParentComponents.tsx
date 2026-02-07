import HeaderTwo from "@/commonLayout/Header";
import { getToken } from "@/utils/getToken";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function HeaderParentComponents() {
  const res = await myFetch("/notifications/me", {
    cache: "no-store",
    tags: ["Notification"],
  });

  const token = await getToken();

  return (
    <>
      <HeaderTwo notification={res?.data} token={token} />
    </>
  );
}
