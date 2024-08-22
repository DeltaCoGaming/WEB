import type { Metadata } from "next";
import { Russo_One } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400", // Russo One only has one weight
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deltacogaming.win"),
  title: {
    default: "Delta CO | Community-Driven Game Servers & Arma 3 Mods",
    template: "%s | Delta CO Gaming",
  },
  description:
    "Join Delta CO's gaming community for Arma 3 and more. We host game servers, create custom mods, and build a tight-knit gaming family. Experience our unique Arma 3 mod and play together!",
  keywords: [
    "Arma 3",
    "game servers",
    "custom mods",
    "gaming community",
    "Delta CO",
    "multiplayer gaming",
    "Arma 3 modding",
  ],
  authors: [{ name: "Delta CO Gaming Community" }],
  creator: "Delta CO",
  publisher: "Delta CO Gaming",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Delta CO | Community-Driven Game Servers & Arma 3 Mods",
    description:
      "Join our tight-knit gaming community. Play on our servers, experience our custom Arma 3 mod, and be part of something special!",
    url: "https://deltacogaming.win",
    siteName: "Delta CO Gaming",
    images: [
      {
        url: "https://deltacogaming.win/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta CO Gaming - Community Servers & Arma 3 Mods",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta CO | Community-Driven Game Servers & Arma 3 Mods",
    description:
      "Join our gaming family for Arma 3 and more. Custom servers, unique mods, and a passionate community await!",
    creator: "@deltacogaming",
    images: ["https://deltacogaming.win/twitter-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://deltacogaming.win",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </head>
      <body className={russoOne.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
