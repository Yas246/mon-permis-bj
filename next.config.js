const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: ({ url, request }) => {
        const isSameDomain = url.origin === self.location.origin;
        const isHTML = request.destination === "document";
        const isNavigate = request.mode === "navigate";
        const isRoute =
          url.pathname === "/" ||
          url.pathname === "/examen" ||
          url.pathname === "/revision" ||
          url.pathname === "/historique" ||
          url.pathname === "/sommaire";

        return isSameDomain && (isHTML || isNavigate) && isRoute;
      },
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
        matchOptions: {
          ignoreSearch: true,
          ignoreVary: true,
        },
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameDomain = url.origin === self.location.origin;
        return (
          isSameDomain &&
          (url.pathname.startsWith("/_next/data") ||
            url.pathname.endsWith(".json") ||
            url.searchParams.has("_rsc") ||
            url.searchParams.has("__WB_REVISION__"))
        );
      },
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-data",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
        matchOptions: {
          ignoreVary: true,
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 heures
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 1 mois
        },
      },
    },
    {
      urlPattern: /\/api\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 heures
        },
      },
    },
    {
      urlPattern: /\/questions_reponses\.json$/,
      handler: "CacheFirst",
      options: {
        cacheName: "questions-data",
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
  buildExcludes: [/app-build-manifest.json$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
