// Page text lives in messages/en-US.json (base locale, html lang="en-US"). Every visible string is rendered with
// data-i18n="<key>" so a locale toggle (the spanish-translation lab adds messages/es-ES.json) can swap it in place.
// Product names (AshtonBach, the copyright line) are not messages. Keys are flat; values are plain strings.
import en from "../messages/en-US.json";

export const BASE_LOCALE = "en-US";
export type Messages = Record<string, string>;
export const messages: Messages = en as Messages;

// Missing key -> the key itself is never shown: fall back to the given default, so a bad key can't fail `next build`.
export function t(key: string, fallback = ""): string {
  const v = messages[key];
  return typeof v === "string" ? v : fallback;
}
