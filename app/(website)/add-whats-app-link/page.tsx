import AddWhatsLink from "@/components/addWhatsLink/AddWhatsLink";
import { myFetch } from "@/utils/myFetch";

export default async function AddWhatsLinkPage() {
  const res = await myFetch("/users/profile");
  console.log("res", res);

  return (
    <>
      <AddWhatsLink phone={res?.data?.phone} />
    </>
  );
}
