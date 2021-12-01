import { HomePage, SignInPage, RegisterPage, DetailPage } from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./i18n/configs";

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
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
