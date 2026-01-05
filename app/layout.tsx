import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Languages from "@/languages/Languages";
import { Toaster } from "@/components/ui/sonner";
// export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jobsin",
  description: "Job circular application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Languages />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
