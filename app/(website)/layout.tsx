import HeaderTwo from "@/commonLayout/HeaderTwo";
import FooterTwo from "@/commonLayout/FooterTwo";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HeaderTwo />
      {children}
      <FooterTwo />
    </main>
  );
}
