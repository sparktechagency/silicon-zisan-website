import { CreateForm } from "@/components/appointments/CreateForm";
import BackButton from "@/share/BackButton";
import Container from "@/share/Container";

export default function AppointmentCreateForm() {
  return (
    <Container className="my-12 px-2 md:px-10 lg:px-0">
      <BackButton />

      <CreateForm />
    </Container>
  );
}
