import styles from "./page.module.css";
import { Navbar, Search, Footer } from "../component";



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
