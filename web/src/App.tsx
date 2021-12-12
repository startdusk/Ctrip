import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
} from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          {/* ? 代表参数是可选的 */}
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
