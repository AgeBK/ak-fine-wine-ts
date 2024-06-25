import { Link } from "react-router-dom";
import Img from "../Image";
import { campaingMini } from "../../data/appData.json";
import styles from "../home/Home.module.css";

type CampainMiniProps = {
  id: number;
  link: string;
  hdr: string;
  blurb1: string;
  blurb2: string;
  imgSrc: string;
  imgAlt: string;
};

export default function HomeCampaignMini() {
  return (
    <div className={styles.campaignMini}>
      {campaingMini.map(
        ({
          id,
          link,
          hdr,
          blurb1,
          blurb2,
          imgSrc,
          imgAlt,
        }: CampainMiniProps) => (
          <div className={styles.offer} key={id}>
            <Link to={link}>
              <h3 className={styles.hdr}>{hdr}</h3>
              <div className={styles.twoForBlurb}>{blurb1}</div>
              <div className={styles.twoForBlurb}>{blurb2}</div>
              <Img image={imgSrc} imageStyle="campaignMini" imageAlt={imgAlt} />
              <h3 className={styles.shopNow}>SHOP NOW</h3>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
