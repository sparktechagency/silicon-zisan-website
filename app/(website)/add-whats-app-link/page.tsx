import AddWhatsLink from "@/components/addWhatsLink/AddWhatsLink";
import { myFetch } from "@/utils/myFetch";

export default async function AddWhatsLinkPage() {
  const res = await myFetch("/users/profile");

  return (
    <>
      <AddWhatsLink phone={res?.data?.phone} />
    </>
  );
}
