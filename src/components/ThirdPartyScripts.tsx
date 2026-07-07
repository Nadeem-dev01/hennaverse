'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function ThirdPartyScripts() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => {
      setShouldLoad(true);
      window.removeEventListener('scroll', load);
      window.removeEventListener('mousemove', load);
      window.removeEventListener('touchstart', load);
      window.removeEventListener('keydown', load);
    };

    window.addEventListener('scroll', load, { passive: true });
    window.addEventListener('mousemove', load, { passive: true });
    window.addEventListener('touchstart', load, { passive: true });
    window.addEventListener('keydown', load, { passive: true });

    return () => {
      window.removeEventListener('scroll', load);
      window.removeEventListener('mousemove', load);
      window.removeEventListener('touchstart', load);
      window.removeEventListener('keydown', load);
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
          gtag('config', 'G-1JDYJ0QPC4', { send_page_view: true });
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
