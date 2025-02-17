const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  reloadOnOnline: false,
  scope: "/",
  sw: "sw.js",
  cacheId: "permix-v1",
  dynamicStartUrl: false,
  publicExcludes: ["!questions_reponses.json"],
  buildExcludes: [/app-build-manifest.json$/],
  fallbacks: {
    document: false,
    image: false,
    audio: false,
    video: false,
    font: false,
  },
  runtimeCaching: [
    {
      urlPattern: ({ url }) => {
        const isSameDomain = url.origin === self.location.origin;
        return isSameDomain;
      },
      handler: "CacheFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        matchOptions: {
          ignoreSearch: true,
          ignoreVary: true,
        },
        cacheableResponse: {
          statuses: [0, 200],
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
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameDomain = url.origin === self.location.origin;
        return (
          isSameDomain &&
          (url.pathname.startsWith("/_next/") ||
            url.pathname.startsWith("/static/"))
        );
      },
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(js|css|json)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|gif|svg|ico|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
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
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    disableOptimizedLoading: true,
  },
};

module.exports = withPWA(nextConfig);
