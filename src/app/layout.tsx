import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Viewport } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D6DAFF", // move themeColor here!
};

export const metadata: Metadata = {
  title: "Latvala Farms Hours Tracker",
  description: "Track your farm hours (online & offline)",
  manifest: "/manifest.json",
  icons: {
    icon: "/pig.png", // <link rel="icon" href="/pig.png" />
    apple: "/pig.png", // <link rel="apple-touch-icon" href="/pig.png" />
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#D6DAFF" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
