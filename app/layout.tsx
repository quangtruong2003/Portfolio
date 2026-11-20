import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import {
  Be_Vietnam_Pro,
  Bricolage_Grotesque,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import MotionProvider from "@/components/animations/MotionProvider";

const bricolageDisplay = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const beVietnamSans = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-ui",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F6F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1713" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quangtruong.dev"),
  title: {
    default: "Nguyen Quang Truong | PHP & Systems Engineer",
    template: "%s | Nguyen Quang Truong",
  },
  description:
    "Portfolio of Nguyen Quang Truong, a PHP & systems engineer building maintainable Laravel 12 APIs, MySQL/Redis data workflows, and Rust Windows software.",
  keywords: [
    "Nguyen Quang Truong",
    "Nguyễn Quang Trường",
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
    "SmoothScroll",
    "Ho Chi Minh City",
    "Vietnam",
  ],
  authors: [{ name: "Nguyen Quang Truong" }],
  creator: "Nguyen Quang Truong",
  openGraph: {
    title: "Nguyen Quang Truong | PHP & Systems Engineer",
    description:
      "PHP engineer building Laravel 12 backends, MySQL/Redis data workflows, and Rust Windows desktop software.",
    url: "https://quangtruong.dev",
    siteName: "Nguyen Quang Truong",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Quang Truong | PHP & Systems Engineer",
    description:
      "PHP engineer focused on Laravel backends, reliable APIs, MySQL, Redis, and Rust desktop software.",
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
    jobTitle: "PHP & Systems Engineer",
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
      className={`${bricolageDisplay.variable} ${beVietnamSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <MotionProvider>
          <LanguageProvider initialLanguage={initialLanguage}>
            {children}
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
