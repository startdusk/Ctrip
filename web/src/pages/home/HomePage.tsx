import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Col, Typography, Spin } from "antd";
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners,
} from "../../components";

import { productList1, productList2, productList3 } from "./mockups";
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";

import styles from "./HomePage.module.css";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getProductList = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/productCollections"
      );
      console.log(camelcaseKeys(data, { deep: true }));
      setProductList(camelcaseKeys(data, { deep: true }));
      setLoading(false);
      setError(null);
    };
    try {
      getProductList();
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  }, []);

  if (loading) {
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
    <>
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
      </div>
      <Footer />
    </>
  );
};
