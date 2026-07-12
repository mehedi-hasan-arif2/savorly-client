import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Savorly — Cook, Share, Discover",
  description: "A community kitchen where home cooks share recipes worth making again.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${fraunces.variable} ${inter.variable} font-body antialiased bg-white`}>
        <AuthProvider>
          <Toaster position="top-center" toastOptions={{ style: { fontSize: "14px" } }} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
