interface Window {
  workbox: ServiceWorkerRegistration;
}

interface ServiceWorkerRegistration {
  waiting: ServiceWorker | null;
  active: ServiceWorker | null;
}

declare const self: ServiceWorkerGlobalScope;
