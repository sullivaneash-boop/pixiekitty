import type { Metadata, Viewport } from "next";
import { Archivo_Black, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Pixiekitty — Enter the Signal",
  description: "Step inside Pixiekitty’s dreamy pop transmission: music, visuals, live signals, and a tiny machine for big feelings.",
  keywords: ["Pixiekitty", "pop artist", "dream pop", "music", "artist website"],
  openGraph: {
    title: "Pixiekitty — Enter the Signal",
    description: "A tiny machine for big feelings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixiekitty — Enter the Signal",
    description: "A tiny machine for big feelings.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#170710",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
