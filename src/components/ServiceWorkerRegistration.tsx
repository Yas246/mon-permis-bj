"use client";

import { useEffect } from "react";
import { Workbox } from "workbox-window";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    console.log("🔍 Vérification de l'environnement...");
    console.log("- window existe:", typeof window !== "undefined");
    console.log(
      "- serviceWorker dans navigator:",
      "serviceWorker" in navigator
    );
    console.log("- window.workbox:", window?.workbox);

    if (typeof window === "undefined") {
      console.log("❌ Window n'est pas défini (côté serveur)");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("❌ Service Worker non supporté par le navigateur");
      return;
    }

    const registerServiceWorker = async () => {
      try {
        console.log("🔄 Tentative d'enregistrement du Service Worker...");

        // Vérifier si un service worker est déjà enregistré
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          console.log("ℹ️ Service Worker déjà enregistré:", registration);
          console.log("- scope:", registration.scope);
          console.log("- état actif:", registration.active?.state);
          console.log("- état en attente:", registration.waiting?.state);
          return;
        }

        // Créer une nouvelle instance de Workbox
        const wb = new Workbox("/sw.js");
        console.log("📦 Instance Workbox créée");

        // Écouter les événements d'installation
        wb.addEventListener("installed", (event) => {
          console.log("✅ Service Worker installé:", event);
        });

        // Écouter les événements d'activation
        wb.addEventListener("activated", (event) => {
          console.log("🚀 Service Worker activé:", event);
        });

        // Écouter les erreurs
        wb.addEventListener("controlling", (event) => {
          console.log("👨‍✈️ Service Worker prend le contrôle:", event);
        });

        // Écouter les erreurs
        wb.addEventListener("waiting", (event) => {
          console.log("⏳ Service Worker en attente:", event);
        });

        // Enregistrer le service worker
        const newRegistration = await wb.register();
        console.log("✨ Nouveau Service Worker enregistré:", newRegistration);
        if (newRegistration) {
          console.log("- scope:", newRegistration.scope);
          console.log("- état actif:", newRegistration.active?.state);
        }
      } catch (error) {
        console.error(
          "❌ Erreur lors de l'enregistrement du Service Worker:",
          error
        );
        if (error instanceof Error) {
          console.error("- message:", error.message);
          console.error("- stack:", error.stack);
        }
      }
    };

    // Lancer l'enregistrement
    registerServiceWorker();

    // Nettoyage
    return () => {
      console.log("🧹 Nettoyage du composant ServiceWorkerRegistration");
    };
  }, []);

  return null;
}

// Types pour TypeScript
declare global {
  interface Window {
    workboxInstance: Workbox;
  }
}
