import { memo } from "react";
import { blurb } from "../../data/appData.json";
import { deHyphenate } from "../../data/utils";
import styles from "./Blurb.module.css";

type BlurbProps = {
  urlCategory?: string;
  urlVariety?: string;
  header: string;
};

export const Blurb = memo(({ urlCategory, urlVariety, header }: BlurbProps) => {
  const synopsis: KeyStringProps = blurb;

  if (urlCategory && blurb) {
    const wineCategory = synopsis[urlCategory];
    let wineVariety = urlVariety && synopsis[urlVariety];
    if (header) {
      wineVariety = blurb["generic"];
    }

    return (
      <section className={styles.categoryBlurb}>
        <h2 className={styles.variety}>
          {header ||
            (urlVariety && deHyphenate(urlVariety)) ||
            deHyphenate(urlCategory)}
        </h2>
        <div className={styles.varietyBlurb}>{wineVariety || wineCategory}</div>
      </section>
    );
  }
  return null;
});
