import { Col, Row } from "antd";
import React from "react";
import { MainLayout } from "../../layouts";

import styles from "./ShoppingCartPage.module.css";

interface ShoppingCartPageProps {}

export const ShoppingCartPage: React.FC<ShoppingCartPageProps> = () => {
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}></div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <div className={styles["payment-card-container"]}></div>
        </Col>
      </Row>
    </MainLayout>
  );
};
