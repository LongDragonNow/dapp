import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { cookieToInitialState } from "wagmi";
import { config } from "./config";
import "./globals.css";
import { ContextProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Long Dragon",
  description:
    "The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems",
  metadataBase: new URL("https://longdragon.vercel.app"),
  openGraph: {
    title: "Long Dragon",
    description:
      "The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems",
    url: "https://longdragon.ai/",
    siteName: "Long Dragon",
    images: [
      {
        url: "https://longdragon.vercel.app/hero.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://longdragon.vercel.app/hero.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Long Dragon",
    description:
      "The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems",
    creator: "@LongDragonLD",
    images: ["https://longdragon.vercel.app/hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "./site.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx("min-h-screen font-ppNeueMachina", inter.className)}
        suppressHydrationWarning
      >
        <ContextProvider initialState={initialState}>
          {children}
        </ContextProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
