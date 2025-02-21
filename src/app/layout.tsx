import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvide";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className=" overflow-x-hidden bg-[#09090B] text-white">
          <Navbar/>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
