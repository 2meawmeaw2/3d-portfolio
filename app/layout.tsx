import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import { ReactLenis } from "@/lib/ReactLenis";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
import ViewCanvas from "./component/ViewCanvas";
import "./globals.css";
import RealNavBar from "./component2D/NavBarComponents";
export const metadata: Metadata = {
  title: "Code Translator",
  description: "Web developer portfolio",
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
          className={`${poppins.variable} ${outfit.variable} relative antialiased  overflow-x-clip `}
        >
          <nav className="sticky  top-0 z-100 ">
            <RealNavBar />
          </nav>
          <main className="relative">
            {children}
            <ViewCanvas />
          </main>
        </body>
      </ReactLenis>
    </html>
  );
}
