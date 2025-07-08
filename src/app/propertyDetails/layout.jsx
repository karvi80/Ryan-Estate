import React from "react";
import  Navbar  from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";

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
