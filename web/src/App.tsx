import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  );
}

export default App;
