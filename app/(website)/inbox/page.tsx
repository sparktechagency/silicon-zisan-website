import Inbox from "@/components/inbox/Inbox";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const name = (await searchParams)?.name;

  return (
    <>
      <Inbox name={name} />
    </>
  );
}
