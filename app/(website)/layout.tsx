import Footer from "@/commonLayout/Footer";
import Header from "@/commonLayout/Header";
import Sidebar2 from "@/components/dashboard/Sidebar2";
import Container from "@/share/Container";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getProfile();

  return (
    <>
      {/* ------------------before code  */}
      {/* <Header />
      {children}
      <Footer /> */}

      {/* newest code */}
      <Header />
      <Container className="flex flex-col xl:flex-row gap-4 my-12 px-2 md:px-10 lg:px-0">
        <Sidebar2 />

        {/* Content */}
        <div className="flex-1 px-4 max-h-[83vh] overflow-y-scroll">
          {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}
