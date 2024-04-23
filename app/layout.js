import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Progress Writer",
  description: "Keep Track of your Project Daily Progress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-x-hidden`}>
        <Providers>
          <Header />
          <Navbar />
          <main>{children}</main>
          <Toaster richColors position="top-right" className="top-24" />
        </Providers>
      </body>
    </html>
  );
}
