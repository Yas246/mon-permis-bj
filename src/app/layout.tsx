import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PWAUpdater from "../components/PWAUpdater";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Mon Permis BJ",
  description: "Application d'apprentissage du code de la route au Bénin",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mon Permis BJ",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Mon Permis BJ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mon Permis BJ" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <main className="container px-4 py-8 mx-auto">{children}</main>
            <PWAUpdater />
            <ServiceWorkerRegistration />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
