import { Link } from "react-router-dom";
import Img from "../Image";
import styles from "./BreadCrumb.module.css";

type BreadCrumbProps = {
  urlCategory?: string;
  urlVariety?: string;
  category: string;
  variety: string;
};

const Chevron = () => (
  <span className={styles.chevronCont}>
    <span className={styles.chevron}></span>
    <span className={styles.chevron}></span>
  </span>
);

const BreadCrumb = ({
  urlCategory,
  urlVariety,
  category,
  variety,
}: BreadCrumbProps) => {
  return (
    <div className={styles.breadCrumb}>
      <Link to="/" className={styles.category}>
        {/* WAVE tool alerts when passing alt text here */}
        <Img image={`icons/home.png`} imageStyle="" imageAlt="" />
        Home
      </Link>
      <Chevron />
      <Link to={`/${urlCategory}`} className={styles.category}>
        {category}
      </Link>
      <Chevron />
      <Link to={`/${urlCategory}/${urlVariety}`} className={styles.category}>
        {variety}
      </Link>
    </div>
  );
};

export default BreadCrumb;
