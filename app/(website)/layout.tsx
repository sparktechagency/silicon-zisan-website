import Footer from "@/commonLayout/Footer";
import SidebarCheck from "@/components/sidebarCheck/SidebarCheck";
import { SocketProvider } from "@/context/SocketContext";
import Container from "@/share/Container";
import HeaderParentComponents from "@/share/HeaderParentComponents";
import { getToken } from "@/utils/getToken";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  return (
    <SocketProvider token={token!}>
      {/* newest code */}
      <HeaderParentComponents />
      <Container className="flex flex-col xl:flex-row gap-4 my-5 sm:my-12 md:px-10 lg:px-0">
        <SidebarCheck />

        {/* Content */}
        <div className="flex-1 px-4 max-h-[83vh] overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </Container>
      <Footer />
    </SocketProvider>
  );
}
