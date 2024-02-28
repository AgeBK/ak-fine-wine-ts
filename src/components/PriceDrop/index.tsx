import { Link } from "react-router-dom";
import styles from "./PriceDrop.module.css";
import { numberToWord } from "../../data/appData.json";

type PriceDropProps = {
  calloutText: string | undefined;
};

const PriceDrop = ({ calloutText }: PriceDropProps) => {
  const numToWord: { [key: number]: string } = numberToWord;
  let arr: string[] = [];
  let amount: string = "";
  let price: number = 0;
  let isTenPercent: boolean = false;
  let priceDropLink: JSX.Element | null = null;

  if (calloutText) {
    if (calloutText.includes("for")) {
      // 2 for and 10 for deals
      arr = calloutText.split(" ");
      amount = numToWord[Number(arr[0])];
      price = parseInt(arr[2].replace("$", ""), 10);
    } else if (calloutText.startsWith("10%")) {
      isTenPercent = true;
    }
  }

  if (arr.length > 0) {
    priceDropLink = (
      <Link
        to={`/${amount}-for-${price}`}
        className={`${styles.sale} ${styles.twoFor}`}
      >
        <span className={`${styles.priceDrop}`}>
          {arr.map((val) => (
            <div className={styles.info} key={val}>
              {val}
            </div>
          ))}
        </span>
        <span className={styles.seeAll}>
          See
          <br />
          All
        </span>
      </Link>
    );
  } else if (isTenPercent) {
    priceDropLink = (
      <div className={styles.special}>
        <Link to="/ten-percent-off">{calloutText} </Link>
      </div>
    );
  } else {
    priceDropLink = (
      <Link to="/price-drop" className={styles.sale}>
        <span className={styles.priceDrop}>
          PRICE <br /> DROP
        </span>
        <span className={styles.seeAll}>
          See
          <br />
          All
        </span>
      </Link>
    );
  }

  return priceDropLink;
};

export default PriceDrop;
