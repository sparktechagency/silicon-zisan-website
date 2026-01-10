import AddWhatsLink from "@/components/addWhatsLink/AddWhatsLink";
import { myFetch } from "@/utils/myFetch";

export default async function AddWhatsLinkPage() {
<<<<<<< HEAD
  const res = await myFetch("/users/profile");
  //console.log("res", res);
=======
  const res = await myFetch("/employers/me");
>>>>>>> ceb4b5c532f5ba14580cf7549592cb374d37f855

  return (
    <>
      <AddWhatsLink whatsApp={res?.data?.whatsApp} />
    </>
  );
}
