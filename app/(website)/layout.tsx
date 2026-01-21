import Footer from "@/commonLayout/Footer";
import Header from "@/commonLayout/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getProfile();

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
