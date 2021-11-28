import { Row, Col } from "antd";
import { Header, Footer, SideMenu, Carousel } from "./components";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default App;
