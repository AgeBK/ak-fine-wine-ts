import { memo } from "react";
import { blurb } from "../../data/appData.json";
import { deHyphenate } from "../../data/utils";
import styles from "./Blurb.module.css";

type BlurbProps = {
  urlCategory: string;
  variety?: string;
  header: string;
};

export const Blurb = memo(({ urlCategory, variety, header }: BlurbProps) => {
  const synopsis: KeyStringProps = blurb;
  // use header provided (custom header) or just dehypenate URL params
  const hdr =
    header ||
    (variety && deHyphenate(variety)) ||
    deHyphenate(urlCategory);

  const wineBlurb =
    (variety && synopsis[variety]) || // some wines have a specific variety blurb (sub-category)
    synopsis[urlCategory] || // some have a specific category blurb
    synopsis["generic"]; // some have a generic blurb

  return (
    <section className={styles.categoryBlurb}>
      <h2 className={styles.variety}>{hdr}</h2>
      <div className={styles.blurb}>{wineBlurb}</div>
    </section>
  );
});
