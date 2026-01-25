import Inbox from "@/components/inbox/Inbox";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;

  return (
    <>
      <Inbox adminId={id} />
    </>
  );
}
