import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nopak | High-Quality Property & Construction Solutions",
  description: "Premium Wendy Houses, Tree Felling, Renovations, Swimming Pools, and Plumbing services in Gauteng.",
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nopak",
  "description": "High-Quality Property & Construction Solutions",
  "telephone": "+27678224890",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Gauteng",
    "addressCountry": "ZA"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-blue text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
