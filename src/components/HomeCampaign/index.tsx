import { Link } from "react-router-dom";
import styles from "../home/Home.module.css";

type HomeCampaignProps = {
  link: string;
  hdr: string;
  text: string;
  finePrint: string;
};

export default function HomeCampaignMini({
  link,
  hdr,
  text,
  finePrint,
}: HomeCampaignProps) {
  return (
    <div className={styles.campaign}>
      <Link to={`/${link}`}>
        <h2 className={styles.tenOff}>{hdr}</h2>
        <h2 className={styles.selected}>{text}</h2>
        <h2 className={styles.shopNow}>SHOP NOW</h2>
        <div className={styles.finePrint}>{finePrint}</div>
      </Link>
    </div>
  );
}
