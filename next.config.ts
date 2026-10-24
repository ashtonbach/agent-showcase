import type { NextConfig } from "next";
import { BASE_PATH, PUBLIC_ORIGIN } from "./app/base-path";

// Old production host. Browsers that open it get a permanent redirect to the same path + query under
// agents.ashtonbach.com/showcase. Requests proxied by the agents-live worker carry x-showcase-proxy: 1 and are
// served normally (no loop). Preview deployments (other *.vercel.app hosts) and local dev are never redirected.
const OLD_HOST = "agent-showcase-tawny.vercel.app";
const fromOldHost = [{ type: "host" as const, value: OLD_HOST }];
const notProxied = [{ type: "header" as const, key: "x-showcase-proxy" }];

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  async redirects() {
    return [
      // old links already under /showcase (e.g. assets) keep their path
      { source: `${BASE_PATH}/:path*`, has: fromOldHost, missing: notProxied, destination: `${PUBLIC_ORIGIN}${BASE_PATH}/:path*`, permanent: true },
      // every other old path (/, /?lang=fr, ...) moves under /showcase
      { source: "/", basePath: false, has: fromOldHost, missing: notProxied, destination: `${PUBLIC_ORIGIN}${BASE_PATH}`, permanent: true },
      { source: "/:path((?!showcase(?:/|$)).+)", basePath: false, has: fromOldHost, missing: notProxied, destination: `${PUBLIC_ORIGIN}${BASE_PATH}/:path`, permanent: true },
      // preview / local: the bare root opens the showcase
      { source: "/", basePath: false, destination: BASE_PATH, permanent: false },
      // feature code written with root-relative /lab/<slug>/... art still resolves on direct (preview) hosts
      { source: "/lab/:path*", basePath: false, destination: `${BASE_PATH}/lab/:path*`, permanent: false },
    ];
  },
};

export default nextConfig;
