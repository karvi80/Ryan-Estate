import React from "react";
import "./openhouse.css"
import Image from "next/image";

const Openhouse = () => {
  return (
  <div className="openhouse">
    <div className="">
              <Image src="/assets/openhouse.jpg"
               alt="openhouse" 
               width={400} height={400} 
               className="openhouse-img"
              />
    </div>

    <div className="openhouse-text">
        <h1>Start touring homes, no strings attached</h1>
        <h4>Unlike many other agents, Ryan Estate agents won&apos;t ask you to sign an exclusive commitment before they&apos;ll take you on a first tour.</h4>
        <button className="openhouse-text-btn">Search for Homes</button>
    </div>
  </div>
  );
};

export default Openhouse;
