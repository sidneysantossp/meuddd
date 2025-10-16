import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MEU DDD - Códigos DDD do Brasil | Encontre o DDD que você precisa",
  description: "Busca rápida e eficiente de códigos DDD brasileiros. Informações detalhadas sobre estados, cidades e códigos telefônicos de todo o território nacional.",
  keywords: ["DDD", "código DDD", "telefone", "Brasil", "estados", "cidades", "telefonia", "código telefônico"],
  authors: [{ name: "MEU DDD" }],
  verification: {
    google: "BA4r2fAM34nq4hOOYSHH4bpUw2r1kQFtS29VKovhvvg",
  },
  openGraph: {
    title: "MEU DDD - Códigos DDD do Brasil",
    description: "Busca rápida e eficiente de códigos DDD brasileiros",
    url: "https://www.meuddd.com.br",
    siteName: "MEU DDD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEU DDD - Códigos DDD do Brasil",
    description: "Busca rápida e eficiente de códigos DDD brasileiros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
