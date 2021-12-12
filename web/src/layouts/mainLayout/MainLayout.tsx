import React from "react";
import { Footer, Header } from "../../components";

import styles from "./MainLayout.module.css";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
