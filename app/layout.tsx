import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ContextMenuProvider from "@/components/ui/ContextMenuProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyen Quang Truong — Software Engineer",
  description:
    "Portfolio of Nguyen Quang Truong — Software Engineer specializing in Laravel, AI Automation, N8N, RESTful APIs, and scalable backend systems. Based in Ho Chi Minh City.",
  keywords: [
    "Nguyen Quang Truong",
    "Software Engineer",
    "PHP Developer",
    "Laravel Developer",
    "Backend Developer",
    "AI Automation",
    "N8N",
    "Ho Chi Minh City",
    "Vietnam",
    "Laravel 12",
    "RESTful API",
    "MySQL",
    "PHP 8",
  ],
  authors: [{ name: "Nguyen Quang Truong" }],
  creator: "Nguyen Quang Truong",
  openGraph: {
    title: "Nguyen Quang Truong — Software Engineer",
    description:
      "Software Engineer specializing in Laravel, AI Automation, N8N, RESTful APIs, and scalable backend systems.",
    url: "https://quangtruong.dev",
    siteName: "Nguyen Quang Truong Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Quang Truong — Software Engineer",
    description:
      "Software Engineer specializing in Laravel, AI Automation, N8N, RESTful APIs, and scalable backend systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://quangtruong.dev",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("portfolio-language")?.value;
  const initialLanguage =
    savedLang === "vi" || savedLang === "en" ? savedLang : "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nguyen Quang Truong",
    jobTitle: "Software Engineer",
    url: "https://quangtruong.dev",
    email: "nguyentruongk530042003@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    sameAs: [
      "https://github.com/quangtruong2003",
      "https://www.linkedin.com/in/quangtruong2003",
    ],
    knowsAbout: [
      "PHP",
      "Laravel",
      "AI Automation",
      "N8N",
      "RESTful API",
      "MySQL",
      "Software Engineering",
      "Backend Development",
    ],
  };

  return (
    <html
      lang={initialLanguage}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider initialLanguage={initialLanguage}>
          <ContextMenuProvider>
            {children}
          </ContextMenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
