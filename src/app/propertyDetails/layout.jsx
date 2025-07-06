import { Navbar } from "@/component";
import Footer from "@/component/footer/Footer";
import React from "react";

const layout = ({ children }) => {
  return (
  <section>
    <Navbar />
    {children}
    <Footer />
  </section>
  );
};

export default layout;
