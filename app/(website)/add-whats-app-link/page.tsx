import AddWhatsLink from "@/components/addWhatsLink/AddWhatsLink";
import { myFetch } from "@/utils/myFetch";

export default async function AddWhatsLinkPage() {
  const res = await myFetch("/employers/me");

  return (
    <>
      <AddWhatsLink whatsApp={res?.data?.whatsApp} />
    </>
  );
}
