import { imgPath } from "../../data/appData.json";
import styles from "./image.module.css";

type ImageProps = {
  image: string;
  imageStyle: keyof typeof styles;
  imageAlt: string;
};

const Image = ({ image, imageStyle, imageAlt }: ImageProps) => (
  <img
    src={`${imgPath}${image}`}
    className={styles[imageStyle]}
    alt={imageAlt}
  />
);

export default Image;
