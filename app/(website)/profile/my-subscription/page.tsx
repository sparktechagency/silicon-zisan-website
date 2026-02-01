import MySubscription from "@/components/profile/MySubscription";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Personal() {
  const res = await myFetch("/subscriptions/me", {
    tags: ["subscription"],
  });

  return (
    <>
      <MySubscription subscriptions={res?.data} />
    </>
  );
}
