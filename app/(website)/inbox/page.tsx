import Inbox from "@/components/inbox/Inbox";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: { name: string; id: string };
}) {
  const { name, id } = await searchParams;

  return (
    <>
      <Inbox name={name} id={id} />
    </>
  );
}
