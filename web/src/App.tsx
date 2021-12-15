import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
} from "./pages";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "./redux/hooks";

import styles from "./App.module.css";

function App() {
  const jwt = useSelector((state) => state.user.token);
  const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = jwt !== null;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };
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
          <Route
            path="/shoppingCart"
            element={
              <RequireAuth redirectTo="/signin">
                <ShoppingCartPage />
              </RequireAuth>
            }
          />
          {/* TODO: page not found */}
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
