import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./design-system.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMotion from "@/components/PageMotion";

const urbanist = localFont({
  src: [
    { path: "../../fonts/urbanist/static/Urbanist-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/urbanist/static/Urbanist-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/urbanist/static/Urbanist-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

const lufga = localFont({
  src: [
    { path: "../../fonts/lufga/LufgaRegular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/lufga/LufgaMedium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/lufga/LufgaSemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-lufga",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Archit Mishra · Data Scientist and Photographer",
    template: "%s · Archit Mishra",
  },
  description:
    "Archit Mishra builds audit-grade GenAI at AB InBev and photographs when the light is good. Projects, measured results, and photography.",
  metadataBase: new URL("https://www.archit-mishra.com"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
  ],
};

// Runs before paint so a saved or system dark theme never flashes light.
const themeScript = `try{var t=localStorage.getItem("theme");if(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${lufga.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="am-skip" href="#main">Skip to Content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <PageMotion />
      </body>
    </html>
  );
}
