"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Google Analytics 4 — uses @next/third-parties/google.
 * Reads measurement ID from NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

/**
 * Microsoft Clarity — reads project ID from NEXT_PUBLIC_CLARITY_PROJECT_ID.
 */
export function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!clarityId) return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, 'clarity', 'script', '${clarityId}');
      `}
    </Script>
  );
}

/**
 * Pageview tracker — sends page_view events to GA4 on route change.
 */
export function PageviewTracker() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (gaId && typeof window !== "undefined" && "gtag" in window) {
      sendGAEvent("page_view", { page_path: pathname });
    }
  }, [pathname, gaId]);

  return null;
}
