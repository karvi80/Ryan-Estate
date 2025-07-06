import Image from "next/image";
import React from "react";
import "./qr.css"

const Qr = () => {
  return (
  <div className="qr-section">
    <div className="qr-section-text">
        <h1>Get the Ryan Estate app</h1>
        <h4>Dowload out top-rated real estate app for iOS or Android to get the moment your dream home hits the market.</h4>
    </div>
    <div>
        <Image src="/assets/qr-code.jpg" alt="QR Code" width={450} height={350} />
  </div>
  </div>
  );
};

export default Qr;
