import { Col, Row, Spin, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header, ProductIntro } from "../../components";
import camelcaseKeys from "camelcase-keys";

import styles from "./DetailPage.module.css";

interface DetailPageProps {}

const { RangePicker } = DatePicker;

export const DetailPage: React.FC<DetailPageProps> = () => {
  const { touristRouteId } = useParams<"touristRouteId">();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/touristRoutes/${touristRouteId}`
        );
        setProduct(camelcaseKeys(data, { deep: true }));
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (loading || !product) {
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
      <div className={styles["page-content"]}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 描点菜单 */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* 下面的共用一个组件，所以要加上id */}
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}></div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}></div>
        {/* 预定须知 */}
        <div id="notes" className={styles["product-detail-container"]}></div>
        {/* 商品评价 */}
        <div id="comments" className={styles["product-detail-container"]}></div>
      </div>
      <Footer />
    </>
  );
};
