import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/hero.png"
          type="image/png"
        />
        <link
          rel="preload"
          as="image"
          href="/bottom-dragon.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />
        <link rel="manifest" href="./site.webmanifest" />
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000"></meta>

        <title>Long Dragon</title>
        <meta
          name="description"
          content="The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems"
        />

        <meta property="og:url" content="https://longdragon.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Long Dragon" />
        <meta
          property="og:description"
          content="The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems"
        />
        <meta
          property="og:image"
          content="https://longdragon.vercel.app/hero.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="longdragon.vercel.app" />
        <meta property="twitter:url" content="https://longdragon.vercel.app" />
        <meta name="twitter:title" content="Long Dragon" />
        <meta
          name="twitter:description"
          content="The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems"
        />
        <meta
          name="twitter:image"
          content="https://longdragon.vercel.app/hero.png"
        />
      </Head>
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
