import React from "react";
import "./Navbar.css";
import Image from "next/image";
import MiniSearchBar from "../miniSearchBar/MiniSearchBar";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <Image src="/logo.png" alt="logo" width={80} height={80} className="logo-img"/>
      <h1>Ryan Estate</h1>
      </div>

      <MiniSearchBar />
      
      <div className="login-singup">
        <button className="login">Log IN</button>

        <button className="singup">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
