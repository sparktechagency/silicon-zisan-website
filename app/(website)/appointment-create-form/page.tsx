import { CreateForm } from "@/components/appointments/CreateForm";
import BackButton from "@/share/BackButton";
import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";

export default async function AppointmentCreateForm({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const res = await myFetch(`/applications/single/${id}`, {
    tags: ["job-seeker-details"],
  });

  //console.log("res", res);

  return (
    <>
      <Container className="my-12 px-2 md:px-10 lg:px-0">
        <BackButton />

        <CreateForm res={res?.data} />
      </Container>
    </>
  );
}
