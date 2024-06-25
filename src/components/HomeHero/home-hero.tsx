import Img from "../Image";
import { Link } from "react-router-dom";
import styles from "../home/Home.module.css";

export default function HomeHero() {
  return (
    <>
      <h2 className={styles.slogan}>
        All of your fine wine needs at the best prices guaranteed!!
      </h2>
      <div className={styles.hero}>
        <Link to="/ten-for-100">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/src/assets/img/promotion/tenFor100Sml1.jpg"
            />
            <Img
              image="promotion/tenFor100.jpg"
              imageAlt="Ten for $100"
              imageStyle="tenFor100"
            />
          </picture>
        </Link>
      </div>
    </>
  );
}
