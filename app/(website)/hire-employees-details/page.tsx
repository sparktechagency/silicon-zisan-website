import ContractInformation from "@/components/hireEmployes/ContactInformation";
import { myFetch } from "@/utils/myFetch";

export default async function ContractInformationHomePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const res = await myFetch(`/jobs/single/${id}`);

  const getProfile = await myFetch("/employers/me", {
    tags: ["profile"],
  });

  const getAdmin = await myFetch("/contact");

  const adminInformation = await myFetch(`/users/profile`, {
    tags: ["profile"],
  });

  console.log("res", res?.data);

  return (
    <>
      <ContractInformation
        data={res?.data}
        getProfile={getProfile?.data}
        getAdmin={getAdmin?.data}
        adminInformation={adminInformation?.data}
      />
    </>
  );
}
