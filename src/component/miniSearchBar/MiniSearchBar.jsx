"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./miniSearchBar.css"

const MiniSearchBar = () => {
    const [city, setCity] = useState(null);
    const router = useRouter();
   
    

    const handleSearch = (e) => {
        e.preventDefault();
        if (!city) return;
        router.push(`/search?city=${encodeURIComponent(city)}`)

    }
    
  return (
  <div className="miniSearchbar">
  <form
  onSubmit={handleSearch}
  className="miniSearchbar-form"
  >
    <input
    className="search-input"
    placeholder="Quick search..."
    type="text" 
        onChange={(e) => setCity(e.target.value)}
    />
    <button type="submit" className="search-input-btn">
    <Image src="/icons/search.svg" alt="search" width={20} height={20} />
    </button>
  </form>
  </div>
  );
};

export default MiniSearchBar;
