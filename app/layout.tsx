import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { DM_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quangtruong.dev"),
  title: "Nguyen Quang Truong | PHP Engineer",
  description:
    "Portfolio of Nguyen Quang Truong, a PHP engineer building maintainable Laravel APIs, data workflows, and Windows desktop software.",
  keywords: [
    "Nguyen Quang Truong",
    "PHP Engineer",
    "PHP Developer",
    "Laravel Developer",
    "Backend Developer",
    "Laravel 12",
    "MySQL",
    "Redis",
    "RESTful APIs",
    "Python",
    "TypeScript",
    "Rust",
    "Tauri",
    "Ho Chi Minh City",
    "Vietnam",
  ],
  authors: [{ name: "Nguyen Quang Truong" }],
  creator: "Nguyen Quang Truong",
  openGraph: {
    title: "Nguyen Quang Truong | PHP Engineer",
    description:
      "PHP engineer building Laravel backends, data workflows, and Windows desktop software.",
    url: "https://quangtruong.dev",
    siteName: "Nguyen Quang Truong",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Quang Truong | PHP Engineer",
    description:
      "PHP engineer focused on Laravel backends, reliable APIs, MySQL, Redis, and desktop software.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://quangtruong.dev" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const savedLanguage = (await cookies()).get("portfolio-language")?.value;
  const initialLanguage =
    savedLanguage === "vi" || savedLanguage === "en" ? savedLanguage : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nguyen Quang Truong",
    jobTitle: "PHP Engineer",
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
      "RESTful APIs",
      "MySQL",
      "Redis",
      "Python",
      "TypeScript",
      "System Architecture",
      "Rust",
      "Tauri",
    ],
  };

  return (
    <html
      lang={initialLanguage}
      suppressHydrationWarning
      className={`${newsreader.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <LanguageProvider initialLanguage={initialLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
