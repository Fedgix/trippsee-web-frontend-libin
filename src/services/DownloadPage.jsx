import React from "react";
import "../style/download.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { appConfig } from "../lib/appConfig.js";

function DownloadPage() {
  return (
    <div className="download-page">
      <div className="download-wrapper">

        <span className="welcome-tag">
          Kerala's Trusted Stay Platform
        </span>

        <h1 className="download-title">
          Download <span>Trippsee</span>
        </h1>

        <p className="download-description">
          Discover handpicked homestays, luxury villas, and unforgettable
          Kerala experiences. Your perfect stay is just a tap away.
        </p>

        <div className="download-buttons">

          <a
            href={appConfig.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="download-btn android-btn"
          >
            
<div>
  <small>GET IT ON</small>
  <strong className="store-text">
    <FaGooglePlay />
    Google Play
  </strong>
</div>
          </a>

          <a
            href={appConfig.appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="download-btn ios-btn"
          >
            

           <div>
  <small>DOWNLOAD ON THE</small>
  <strong className="store-text">
    <FaApple />
    App Store
  </strong>
</div>
          </a>

        </div>

      </div>
    </div>
  );
}

export default DownloadPage;