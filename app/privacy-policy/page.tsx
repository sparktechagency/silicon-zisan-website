import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import dayjs from "dayjs";

export default async function page() {
  const res = await myFetch("/disclaimers/privacy-policy");
  return (
    <>
      <div className="flex items-center justify-center bg-linear-to-br from-[#0f4c5c] to-[#2c7a7b] py-10">
        <h1 className="text-white text-4xl font-semibold">Privacy Policy</h1>
      </div>

      <Container>
        <div className="bg-[#2D3E4F] text-white p-6 md:p-10 space-y-8 font-sans">
          <p
            className="leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: res?.data?.content }}
          />

          <p>
            Last Updated : {dayjs(res?.data?.updatedAt).format("DD-MM-YYYY")}
          </p>
        </div>
      </Container>
    </>
  );
}
