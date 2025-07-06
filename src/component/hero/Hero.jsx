import React from "react";
import HeroCard from "./HeroCard";
import { heros } from "constant";
import "./hero.css"

const Hero = () => {
  return (
  <div className="hero-section">
    {heros.map((hero) => (
        <div key={hero.title} className="hero">
      <HeroCard 
        title={hero.title} 
        desc={hero.desc} 
        link={hero.link} 
        img={hero.img}
      />
      </div>
      ))}
  </div>
  );
};

export default Hero;
