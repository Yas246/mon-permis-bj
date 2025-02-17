"use client";

import { useEffect, useState } from "react";

export default function PWAUpdater() {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  useEffect(() => {
    // Vérifier si le service worker est supporté
    if ("serviceWorker" in navigator) {
      // Écouter les événements de mise à jour
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("waiting", (event) => {
          if (event.target instanceof ServiceWorker) {
            setWaitingWorker(event.target);
            setShowReload(true);
          }
        });
      });
    }
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage("SKIP_WAITING");
    setShowReload(false);
    window.location.reload();
  };

  if (!showReload) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        <p className="mb-2">Une nouvelle version est disponible !</p>
        <button
          onClick={reloadPage}
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
        >
          Mettre à jour
        </button>
      </div>
    </div>
  );
}
