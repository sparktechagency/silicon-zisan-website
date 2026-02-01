import ContractInformation from "@/components/hireEmployes/ContactInformation";
import { myFetch } from "@/utils/myFetch";

export default async function ContractInformationHomePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const res = await myFetch(`/jobs/single/${id}`);

  return (
    <>
      <ContractInformation data={res?.data} />
    </>
  );
}
