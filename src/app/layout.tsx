import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 42 Belgium",
    default: "42 Belgium - Free Tech Training",
  },
  description:
    "Free, peer-to-peer tech education in Belgium. 10 specialisations, 3 languages. No degree required.",
  icons: {
    icon: "/assets/favicon-42belgium.png",
    apple: "/assets/favicon-42belgium.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/seg0ngf.css" />
        <Script
          src="https://kit.fontawesome.com/4334c803c2.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
