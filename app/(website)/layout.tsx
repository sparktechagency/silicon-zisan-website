import Footer from "@/commonLayout/Footer";
import Header from "@/commonLayout/Header";
import getProfile from "@/utils/getProfile";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getProfile();

  console.log(user);

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}
