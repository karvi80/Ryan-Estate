import Image from "next/image";
import React from "react";
import "./hero.css"

const HeroCard = ({ title, desc, link, img}) => {
  return (
  <div className="hero-card">
    <Image src={img} alt={title} width={160} height={160} />
    <h1>{title}</h1>
    <h4>{desc}</h4>
    <button className="hero-card-button">{link}</button>
  </div>
  );
};

export default HeroCard;
