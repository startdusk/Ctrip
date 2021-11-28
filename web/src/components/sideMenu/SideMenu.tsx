import React from "react";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

import { sideMenuList } from "./mockup";
import styles from "./SideMenu.module.css";

interface SideMenuProps {}

export const SideMenu: React.FC<SideMenuProps> = () => {
  return (
    <Menu mode={"vertical"} className={styles["side-menu"]}>
      {sideMenuList.map((m, index) => (
        <Menu.SubMenu
          key={`side-item-${index}`}
          title={
            <span>
              <GifOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smIndex) => (
            <Menu.SubMenu
              key={`sub-item-${smIndex}`}
              title={
                <span>
                  <GifOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsIndex) => (
                <Menu.Item key={`sub-sub-item-${smsIndex}`}>
                  <span>
                    <GifOutlined />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
