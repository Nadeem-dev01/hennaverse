'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function ThirdPartyScripts() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    // Fallback: load after 8 seconds even if no interaction (extended to reduce
    // pressure on the main thread during initial page render)
    const timeoutId = setTimeout(() => {
      setShouldLoad(true);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      {/* Google Analytics — lazyOnload: executes in idle time after all page
          resources have been fetched. Avoids blocking LCP / FCP. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1JDYJ0QPC4"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1JDYJ0QPC4');
        `}
      </Script>

      {/* Google AdSense — lazyOnload: lowest-priority strategy, loads after
          interactive content. Saves ~145 KiB of early main-thread work. */}
      <Script
        id="adsbygoogle-init"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8920350773715513"
        crossOrigin="anonymous"
      />
    </>
  );
}
