import { imgPath } from "../../data/appData.json";
import styles from "./image.module.css";

type ImageProps = {
  image: string;
  imageStyle: keyof typeof styles;
  imageAlt: string;
};

const Image = ({ image, imageStyle, imageAlt }: ImageProps) => {
  const isGHPages = location.hostname === "agebk.github.io";
  console.log(isGHPages);
  const path = `${imgPath}${image}`;
  const imgSrc = isGHPages ? "../" + path : path;
  console.log(imgSrc);

  return <img src={imgSrc} className={styles[imageStyle]} alt={imageAlt} />;
};

export default Image;
