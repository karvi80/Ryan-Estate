import styles from "./page.module.css";
import { Navbar, Footer } from "../component";
import Search from "../app/search/page"



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
