import Img from "../Image";
import styles from "./Footer.module.css";
import { paymentArr } from "../../data/appData.json";

function Footer() {
  const yr = new Date().getFullYear();
  const arr: string[] = paymentArr;

  return (
    <footer className={styles.container}>
      <div className={styles.ak}>© {yr} AK Fine Wines All rights reserved</div>
      <ul className={styles.list}>
        {arr.map((val, ind) => (
          <li key={ind}>
            <Img
              image={`payment/${val}.jpg`}
              imageStyle="footer"
              imageAlt={val}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
