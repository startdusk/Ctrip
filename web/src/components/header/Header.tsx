import React, { useEffect, useState } from "react";

import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { useSelector } from "../../redux/hooks";
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useDispatch } from "react-redux";

import jwt_decode, { JwtPayload as DefaultJwtPayliad } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayliad {
  username: string;
}

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const jwt = useSelector((state) => state.user.token);
  const [username, setUsername] = useState("");

  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );

  const onLogout = () => {
    dispatch(userSlice.actions.logout());
    navigate("/");
  };
  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const manualClick = (e) => {
    if (e.key === "new") {
      // 处理新语言添加action
      dispatch(
        addLanguageActionCreator({
          name: "新语言",
          code: "new_lang",
        })
      );
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  return (
    <>
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={manualClick}>
                  {languageList.map((l) => (
                    <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  ))}
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            {jwt ? (
              <Button.Group className={styles["button-group"]}>
                <span>
                  {t("header.welcome")}
                  <Typography.Text strong>{username}</Typography.Text>
                </span>
                <Button
                  loading={shoppingCartLoading}
                  onClick={() => navigate("/shoppingCart")}
                >
                  {t("header.shoppingCart")}({shoppingCartItems.length})
                </Button>
                <Button onClick={onLogout}>{t("header.signOut")}</Button>
              </Button.Group>
            ) : (
              <Button.Group className={styles["button-group"]}>
                <Button onClick={() => navigate("/register")}>
                  {t("header.register")}
                </Button>
                <Button onClick={() => navigate("/signin")}>
                  {t("header.signin")}
                </Button>
              </Button.Group>
            )}
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={"请输入旅游目的地、主题、或关键字"}
            className={styles["search-input"]}
            onSearch={(keywords) => navigate(`/search/${keywords}`)}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
          <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
          <Menu.Item key="3"> {t("header.group")} </Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
          <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
