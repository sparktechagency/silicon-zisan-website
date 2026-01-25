// import ContactSupport from "@/components/contact-support/ContactSupport";
import { myFetch } from "@/utils/myFetch";
import AdminContact from "./AdminContact";

export default async function ContactSupportPage() {
  const res = await myFetch(`/contact`);
  console.log("res", res);

  return (
    <>
      {/* <ContactSupport /> */}
      <AdminContact adminId={res?.data?.adminId} />
    </>
  );
}
