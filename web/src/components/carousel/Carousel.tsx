import React from "react";
import { Image, Carousel as AntCarousel } from "antd";
import styles from "./Carousel.module.css";

import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";

interface CarouselProps {}

export const Carousel: React.FC<CarouselProps> = () => {
  return (
    <AntCarousel autoplay className={styles.slider}>
      <Image src={carouselImage1} />
      <Image src={carouselImage2} />
      <Image src={carouselImage3} />
    </AntCarousel>
  );
};
