import { Col, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { PaymentCard, ProductList } from "../../components";
import { MainLayout } from "../../layouts";
import { useSelector } from "../../redux/hooks";

import { clearShoppingCart } from "../../redux/shoppingCart/slice";

import styles from "./ShoppingCartPage.module.css";

interface ShoppingCartPageProps {}

export const ShoppingCartPage: React.FC<ShoppingCartPageProps> = () => {
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <div className={styles["payment-card-container"]}>
            <PaymentCard
              loading={shoppingCartLoading}
              originalPrice={shoppingCartItems
                .map((s) => s.originalPrice)
                .reduce((a, b) => a + b, 0)}
              price={shoppingCartItems
                .map(
                  (s) =>
                    s.originalPrice * (s.discountPrice ? s.discountPrice : 1)
                )
                .reduce((a, b) => a + b, 0)}
              onCheckout={() => {}}
              onShoppingCartClear={() => {
                dispatch(
                  clearShoppingCart({
                    jwt,
                    itemIds: shoppingCartItems.map((s) => s.id),
                  })
                );
              }}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};
