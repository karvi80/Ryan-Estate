import React from "react";
import Image from "next/image";
import { locations } from "constant";
import "./locations.css"

const Locations = () => {
  return (
  <div className="location-section">
  <h1>Browse the <span className="location-section-span">newest</span> homes from around the country</h1>
  <div className="location-container">
    {locations.map((location) => (
      <div key={location.title} className="location-card">
      <Image src="/icons/location-pin.svg" alt="location pin" width={24} height={24} />
        <h4>{location.title}</h4>
      </div>
    ))}
  </div>
  </div>
  );
};

export default Locations;
