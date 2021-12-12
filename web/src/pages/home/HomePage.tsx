import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { MainLayout } from "../../layouts";

import { Row, Col, Typography, Spin } from "antd";
import {
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners,
} from "../../components";

import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";

// import styles from "./HomePage.module.css";

import { useSelector } from "../../redux/hooks";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsAcrions";
import { useDispatch } from "react-redux";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recommendProducts.loading);
  const productList = useSelector(
    (state) => state.recommendProducts.productList as any[]
  );
  const error = useSelector((state) => state.recommendProducts.error);
  useEffect(() => {
    dispatch(giveMeDataActionCreator());
    // eslint-disable-next-line
  }, []);

  if (loading || !productList) {
    return (
      <Spin
        size={"large"}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>网站出错了: {error}</div>;
  }

  return (
    <MainLayout>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      <ProductCollection
        title={
          <Typography.Title level={3} type="warning">
            {t("home_page.hot_recommended")}
          </Typography.Title>
        }
        sideImage={sideImage1}
        products={productList[0].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type="danger">
            {t("home_page.new_arrival")}
          </Typography.Title>
        }
        sideImage={sideImage2}
        products={productList[1].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type="success">
            {t("home_page.domestic_travel")}
          </Typography.Title>
        }
        sideImage={sideImage3}
        products={productList[2].touristRoutes}
      />
      <BusinessPartners />
    </MainLayout>
  );
};
