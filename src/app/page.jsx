import Image from "next/image";

import styles from "./page.module.css";
import { Navbar, Search } from "../component";
import Footer from "@/component/footer/Footer";


const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Navbar />
        <Search />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
