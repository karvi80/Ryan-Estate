import styles from "./page.module.css";
import { Navbar, Footer } from "../component";
import SearchClient from "../component/searchClient/SearchClient"
import { Suspense } from "react"



const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Navbar />
        <SearchClient />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
