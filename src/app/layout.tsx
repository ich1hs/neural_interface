import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CursorProvider } from "@/components/providers/CursorProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NEURAL_INTERFACE | AI/ML Architect",
  description:
    "Interfacing with the neural processes of an AI/ML architect. Fullstack systems, machine learning, and data science.",
  keywords: ["AI", "Machine Learning", "Fullstack", "Data Science", "Portfolio"],
  authors: [{ name: "Neural Architect" }],
  openGraph: {
    title: "NEURAL_INTERFACE | AI/ML Architect",
    description: "Interfacing with the neural processes of an AI/ML architect.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased grain-overlay`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <CursorProvider>{children}</CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
