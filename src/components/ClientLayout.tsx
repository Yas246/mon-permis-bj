"use client";

import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "./Navbar";
import PWAUpdater from "./PWAUpdater";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="container px-4 py-8 mx-auto">{children}</main>
        <PWAUpdater />
        <ServiceWorkerRegistration />
      </div>
    </ThemeProvider>
  );
}
