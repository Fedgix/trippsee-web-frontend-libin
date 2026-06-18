import { useEffect, useState } from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { appConfig } from '../lib/appConfig.js';
import '../style/openInApp.css';

export default function OpenInApp({ type, id, autoRedirectDelay = 2500 }) {
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(Math.ceil(autoRedirectDelay / 1000));

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    const mobile =
      /android/i.test(ua) ||
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!isMobile || autoRedirectDelay <= 0) return;

    const timer = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          const ua = navigator.userAgent || navigator.vendor;
          if (/android/i.test(ua)) {
            window.location.href = appConfig.playStoreUrl;
          } else if (
            /iPad|iPhone|iPod/.test(ua) ||
            navigator.platform === 'MacIntel'
          ) {
            window.location.href = appConfig.appStoreUrl;
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMobile, autoRedirectDelay]);

  const title =
    type === 'post'
      ? 'View post'
      : type === 'profile'
        ? 'View profile'
        : 'Open Trippsee';

  return (
    <div className="open-in-app" {...(id ? { 'data-id': id } : {})}>
      <div className="open-in-app-card">
        <div className="open-in-app-heading">
          <h1>{title}</h1>
          <p>Open in the Trippsee app for the best experience</p>
        </div>

        <div className="open-in-app-buttons">
          <a
            href={appConfig.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="open-in-app-btn"
          >
            <FaGooglePlay />
            Google Play
          </a>
          <a
            href={appConfig.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="open-in-app-btn"
          >
            <FaApple />
            App Store
          </a>
        </div>

        {isMobile && autoRedirectDelay > 0 && countdown > 0 && (
          <p className="open-in-app-countdown">
            Redirecting to store in {countdown}s…
          </p>
        )}
      </div>
    </div>
  );
}
