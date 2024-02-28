import { blurb } from "../../data/appData.json";
import styles from "./WineBlurb.module.css";

type WineBlurbProps = {
  urlCategory: string | undefined;
  urlVariety: string | undefined;
};

const WineBlurb = ({ urlCategory, urlVariety }: WineBlurbProps) => {
  const wineData: KeyStringProps = blurb;
  let synopsis = "";
  if (urlVariety && wineData[urlVariety]) {
    synopsis = wineData[urlVariety];
  } else if (urlCategory && wineData[urlCategory]) {
    synopsis = wineData[urlCategory];
  }

  return synopsis ? (
    <div className={styles.productBlurb}>{synopsis}</div>
  ) : null;
};

export default WineBlurb;
