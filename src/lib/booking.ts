/**
 * Centralized Cal.com booking configuration.
 * Update the URL here to change all booking CTAs site-wide.
 */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://cal.com/riverloom-private-limited-1jnzbi/30min";

export const BOOKING_LABELS = {
  primary: "Book Free Consultation",
  secondary: "Schedule a Free Consultation",
  cta: "Book a Consultation",
  mobile: "Book a Call",
} as const;

export const BOOKING_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
