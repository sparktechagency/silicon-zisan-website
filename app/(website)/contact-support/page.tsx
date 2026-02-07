// import ContactSupport from "@/components/contact-support/ContactSupport";
import { myFetch } from "@/utils/myFetch";
import AdminContact from "./AdminContact";

export default async function ContactSupportPage() {
  const res = await myFetch(`/contact`);

  const adminId: string = res?.data?.adminId as string;

  const response = await myFetch("/chats/create", {
    method: "POST",
    body: {
      participants: [adminId],
    },
  });

  return (
    <>
      {/* <ContactSupport /> */}
      <AdminContact chatId={response?.data?._id} adminContact={res?.data} />
    </>
  );
}
