import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { FilterArea, ProductList } from "../../components";
import { MainLayout } from "../../layouts";
import { useSelector } from "../../redux/hooks";
import { getProductSearch } from "../../redux/productSearch/slice";
import styles from "./SearchPage.module.css";

interface SearchPageProps {}

export const SearchPage: React.FC<SearchPageProps> = () => {
  const { keywords } = useParams<"keywords">();
  console.log("keywords", keywords);
  const loading = useSelector((state) => state.productSearch.loading);
  const productList = useSelector((state) => state.productSearch.data);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const error = useSelector((state) => state.productSearch.error);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductSearch({ keywords, nextPage: 1, pageSize: 5 }));
    // 监听location表示我们监听网页url的变化
    // eslint-disable-next-line
  }, [location]);
  const onPageChange = (nextPage, pageSize) => {
    dispatch(getProductSearch({ keywords, nextPage, pageSize }));
  };

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
      {/* 分类过滤器 */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
