import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { PreloadProvider } from "./components/PreloadProvider";
import Loader from "./components/Loader";

export const metadata: Metadata = {
  title: "vertica",
  description: "Vertica — the point where everything converges.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts (CRITICAL for loader sync) */}
        <link
          rel="preload"
          href="/fonts/outfit.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mons.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/space.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <PreloadProvider totalAssets={5}>
          <Loader />

          <SmoothScroll>{children}</SmoothScroll>
        </PreloadProvider>
      </body>
    </html>
  );
}
