import HeaderTwo from "@/commonLayout/Header";
import { getToken } from "@/utils/getToken";
import { myFetch } from "@/utils/myFetch";

export default async function HeaderParentComponents() {
  const res = await myFetch("/notifications/me", {
    cache: "no-store",
    tags: ["Notification"],
  });

  const token = await getToken();

  const response = await myFetch("/chats", {
    // cache: "no-cache",
    tags: ["chatlist"],
  });

  const profileData = await myFetch("/employers/me", {
    tags: ["profile"],
  });

  return (
    <>
      <HeaderTwo
        notification={res?.data}
        token={token}
        messageNotification={response?.data}
        profileData={profileData}
      />
    </>
  );
}
