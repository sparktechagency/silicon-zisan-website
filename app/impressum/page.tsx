import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/disclaimers/impressum");
  return (
    <>
      <div className="flex items-center justify-center bg-linear-to-br from-[#0f4c5c] to-[#2c7a7b] py-10">
        <h1 className="text-white text-4xl font-semibold">Impressum</h1>
      </div>

      <Container>
        <div className="bg-[#2D3E4F] text-white p-6 md:p-10 space-y-8 font-sans">
          <p
            className="leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: res?.data?.content }}
          />

          <p>
            Last Updated : {new Date(res?.data?.updatedAt).toLocaleString()}
          </p>
        </div>
      </Container>
    </>
  );
}
