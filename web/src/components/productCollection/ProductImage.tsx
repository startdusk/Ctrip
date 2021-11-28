import React from "react";
import { Image, Typography } from "antd";

interface ProductImageProps {
  id: number;
  title: string;
  imageSrc: string;
  price: string;
  size: "small" | "large";
}

export const ProductImage: React.FC<ProductImageProps> = ({
  id,
  title,
  imageSrc,
  price,
  size,
}) => {
  return (
    <>
      {size === "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type={"secondary"}>
          {title.slice(0, 25)}
        </Typography.Text>
        <Typography.Text type={"danger"} strong>
          ￥ {price} 起
        </Typography.Text>
      </div>
    </>
  );
};
