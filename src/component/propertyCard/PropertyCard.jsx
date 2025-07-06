import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./PropertyCard.css";
import millify from "millify";

const PropertyCard = ({
  thumbnail,
  price,
  beds,
  baths,
  lot_size,
  address,
  city,
  state_code,
  postal_code,
  property_id,
}) => {
  return (
    <div className="card-container">
      <h3>{property_id}</h3>
      <div className="property-image">
        <Image
          src={thumbnail}
          alt="property picture"
          width={300}
          height={200}
        />
      </div>
      <div className="card-info">
        <div className="property-desc">
          <h3>${millify(price)}</h3>
          <h5>
            {beds} beds | {baths} bath | {lot_size} sqft
          </h5>
          <h5>{address}</h5>
          <h5>
            {city}, {state_code} {postal_code}
          </h5>
        </div>

        <div className="card-button">
          <button>Contact Agent</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
