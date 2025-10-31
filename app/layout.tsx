import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap", // Recommended for better font loading experience
  variable: "--font-poppins", // Define a CSS variable for easy access
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify desired weights
});

export const metadata: Metadata = {
  title: "Jobsin",
  description: "Job circular application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
