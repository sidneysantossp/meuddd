import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeuDDD - Consulta Completa de Códigos DDD do Brasil",
  description: "Encontre informações completas sobre códigos DDD, cidades, operadoras e como ligar para qualquer lugar do Brasil. O guia definitivo da telefonia brasileira.",
  keywords: ["DDD", "telefonia", "códigos de área", "Brasil", "operadoras", "cidades brasileiras", "como ligar"],
  authors: [{ name: "MeuDDD Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "SEU_CODIGO_DE_VERIFICACAO",
  },
  openGraph: {
    title: "MeuDDD - Consulta Completa de Códigos DDD",
    description: "Guia completo de DDDs, cidades e operadoras do Brasil.",
    url: "https://meuddd.com.br",
    siteName: "MeuDDD",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeuDDD - Códigos DDD do Brasil",
    description: "Guia completo de DDDs e cidades do Brasil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google AdSense Meta */}
        <meta name="google-adsense-account" content="ca-pub-3459130972339055" />
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JBGCDM7PFC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JBGCDM7PFC', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3459130972339055"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
