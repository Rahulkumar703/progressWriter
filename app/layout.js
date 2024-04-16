import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";

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
      <body className={poppins.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
