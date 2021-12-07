import { List, Comment } from "antd";
import React from "react";

// import styles from "./ProductComments.module.css";

interface ProductCommentsProps {
  data: {
    author: string;
    avatar: string;
    content: string;
    createDate: string;
  }[];
}

export const ProductComments: React.FC<ProductCommentsProps> = ({ data }) => {
  return (
    <List
      dataSource={data}
      itemLayout="horizontal"
      renderItem={(item) => (
        <li>
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.createDate}
          />
        </li>
      )}
    ></List>
  );
};
