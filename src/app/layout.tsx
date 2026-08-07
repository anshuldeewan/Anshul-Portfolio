import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/features/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress";
import EasterEgg from "@/components/features/EasterEgg";
import GlobalParticleBackground from "@/components/three/GlobalParticleBackground";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LLM Developer",
    "Full Stack Developer",
    "Python",
    "React",
    "Next.js",
    "Anshul Deewan",
    "AI Portfolio",
    "Quantitative Developer",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  metadataBase: new URL(SITE_CONFIG.url),
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="noise surface-bg text-theme antialiased overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          {/* Global Floating Animated Particle Canvas Background */}
          <GlobalParticleBackground />
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            <CommandPalette />
            <EasterEgg />
            <div className="relative z-10">{children}</div>
          </SmoothScroll>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

