import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LayoutWrapper } from "@/components/LayoutWrapper";
<<<<<<< HEAD
import { ThemeProvider } from "next-themes";
=======
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MEU DDD - Consulta Completa de Códigos DDD do Brasil",
    template: "%s | MEU DDD"
  },
  description: "Encontre o código DDD de qualquer cidade ou estado do Brasil. Consulta completa e atualizada de todos os códigos de área telefônica para ligações locais e de longa distância.",
  keywords: [
    "DDD", "código DDD", "consulta DDD", "DDD Brasil", "códigos telefônicos", 
    "área telefônica", "ligação DDD", "telefone Brasil", "DDD por cidade", 
    "DDD por estado", "lista DDD", "busca DDD"
  ],
  authors: [{ name: "MEU DDD" }],
  creator: "MEU DDD",
  publisher: "MEU DDD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://meuddd.com'),
  openGraph: {
    title: "MEU DDD - Consulta Completa de Códigos DDD do Brasil",
    description: "Encontre o código DDD de qualquer cidade ou estado do Brasil. Consulta completa e atualizada de todos os códigos de área telefônica.",
    url: 'https://meuddd.com',
    siteName: "MEU DDD",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MEU DDD - Consulta de Códigos DDD'
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEU DDD - Consulta Completa de Códigos DDD do Brasil",
    description: "Encontre o código DDD de qualquer cidade ou estado do Brasil.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: 'https://meuddd.com',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JBGCDM7PFC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JBGCDM7PFC');
            `,
          }}
        />
        
        {/* Google Search Console Verification Tag */}
        {/* Adicione aqui a meta tag de verificação do Google Search Console */}
        {/* Exemplo: <meta name="google-site-verification" content="seu-codigo-de-verificacao" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
<<<<<<< HEAD
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
        </ThemeProvider>
=======
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster />
>>>>>>> d6af773e1b6a7e90b113a68207c1ec355baf513f
      </body>
    </html>
  );
}
