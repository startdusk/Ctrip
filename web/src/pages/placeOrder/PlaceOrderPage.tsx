import { Col, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { CheckoutCard, PaymentForm } from "../../components";
import { MainLayout } from "../../layouts";
import { useSelector } from "../../redux/hooks";

import { placeOrder } from "../../redux/order/slice";

interface PlaceOrderPageProps {}

export const PlaceOrderPage: React.FC<PlaceOrderPageProps> = () => {
  const jwt = useSelector((state) => state.user.token) as string;
  const loading = useSelector((state) => state.order.loading);
  const order = useSelector((state) => state.order.currentOrder);
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckoutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
