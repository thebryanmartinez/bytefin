// public/service-worker.js

self.addEventListener("install", () => {
  console.log("Service worker installed");
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
  return self.clients.claim();
});

// Optional: basic caching (can be skipped)
self.addEventListener("fetch", () => {
  // You can leave this empty if you don't want offline caching.
});
