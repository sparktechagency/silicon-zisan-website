import AddWhatsLink from "@/components/addWhatsLink/AddWhatsLink";
import { myFetch } from "@/utils/myFetch";

export default async function AddWhatsLinkPage() {
  const res = await myFetch("/employers/me", {
    tags: ["whatsapp"],
  });
  console.log("res?.data?.whatsApp", res?.data);

  return (
    <>
      <AddWhatsLink whatsApp={res?.data?.whatsApp} />
    </>
  );
}
