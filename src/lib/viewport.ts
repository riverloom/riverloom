import type { Viewport } from "next";
import { siteConfig } from "./site-config";

/**
 * Separate viewport export (Next.js 15 requirement).
 * themeColor, colorScheme, and viewport must be exported from
 * a separate `viewport` object, not from metadata.
 */
export const defaultViewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
