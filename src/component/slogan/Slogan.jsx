import React from "react";
import Image from "next/image";

import "./slogan.css"

const Slogan = () => {
  return (
  <div className="slogan-section">
    <div >
        <Image 
        src="/assets/blue-print.jpg" alt="blue print" 
        width={450} height={350}
        className="slogan-img"
         />
    </div>

    <div className="slogan-text">
        <h1>Don&#39;t Settle for a Home. Demand a Kingdom!</h1>
        <h4>We&#39;re full-service, local agents who get to know you over coffee and on home tours, and we use online tools to make you smarter and faster.</h4>
    </div>
  </div>
  );
};

export default Slogan;
