import {
  Col,
  Row,
  Spin,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
} from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Footer,
  Header,
  ProductIntro,
  ProductComments,
} from "../../components";
import camelcaseKeys from "camelcase-keys";
import { commentMockData } from "./mockup";

import { productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";

import styles from "./DetailPage.module.css";

interface DetailPageProps {}

const { RangePicker } = DatePicker;

export const DetailPage: React.FC<DetailPageProps> = () => {
  const { touristRouteId } = useParams<"touristRouteId">();
  // const [loading, setLoading] = useState(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);
  const loading = useSelector((state) => state.productDetail.loading);
  const product = useSelector((state) => state.productDetail.data);
  const error = useSelector((state) => state.productDetail.error);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(productDetailSlice.actions.fetchStart());
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/touristRoutes/${touristRouteId}`
        );
        const product = camelcaseKeys(data, { deep: true });
        dispatch(productDetailSlice.actions.fetchSuccess(product));
      } catch (err: any) {
        dispatch(productDetailSlice.actions.fetchFail(err.message));
      }
    };
    fetchData();
    // eslint-disable-next-line
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
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 下面的共用一个组件，所以要加上id */}
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          {/* 在html显示字符串， dangerouslySetInnerHTML react 设置防止注入攻击,我们是没法在react元素中直接渲染html的，必须通过它设置 */}
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          {/* 在html显示字符串， dangerouslySetInnerHTML react 设置防止注入攻击,我们是没法在react元素中直接渲染html的，必须通过它设置 */}
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预定须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          {/* 在html显示字符串， dangerouslySetInnerHTML react 设置防止注入攻击,我们是没法在react元素中直接渲染html的，必须通过它设置 */}
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价 */}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>商品评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
