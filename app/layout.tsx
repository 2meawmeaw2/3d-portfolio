import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ReactLenis } from "@/lib/ReactLenis";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

import "./globals.css";
import RealNavBar from "./component2D/NavBarComponents";
export const metadata: Metadata = {
  title: "Taha – Web Developer Portfolio",
  description:
    "Interactive portfolio showcasing projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={` ${outfit.variable} ${outfit.className} relative antialiased  overflow-x-clip `}
        >
          <nav className="sticky  top-0 z-70 ">
            <RealNavBar />
          </nav>
          <main className="relative">{children}</main>
        </body>
      </ReactLenis>
    </html>
  );
}
