// The showcase is served at https://agents.ashtonbach.com/showcase (the agents-live worker proxies /showcase/* here).
// next.config.ts sets basePath from this; plain <img>/<a> tags and metadata icons are not prefixed by Next, so use withBase().
export const BASE_PATH = "/showcase";
export const PUBLIC_ORIGIN = "https://agents.ashtonbach.com";
export const withBase = (p: string) => (p === "/" || p === "" ? BASE_PATH : BASE_PATH + (p.startsWith("/") ? p : "/" + p));
