import React from "react";

import { Layout, Typography } from "antd";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Layout.Footer>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        版权所有 @Ctrip 旅游网
      </Typography.Title>
    </Layout.Footer>
  );
};
