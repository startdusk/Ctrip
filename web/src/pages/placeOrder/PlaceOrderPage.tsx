import { Col, Row } from "antd";
import React from "react";
import { PaymentForm } from "../../components";
import { MainLayout } from "../../layouts";

interface PlaceOrderPageProps {}

export const PlaceOrderPage: React.FC<PlaceOrderPageProps> = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          
        </Col>
      </Row>
    </MainLayout>
  );
};
