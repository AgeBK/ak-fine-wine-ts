import Button from "../Button";
import { pillsArr } from "../../data/appData.json";
import styles from "./Pills.module.css";

type PillsProps = {
  filters: FilterProps;
  removeFilters: (val: string) => void;
};

const Pills = ({ filters, removeFilters }: PillsProps) => {
  const arr: string[] = pillsArr;
  const html = arr.reduce(
    (acc: JSX.Element[], val: string) =>
      filters[val as keyof FilterProps]
        ? (acc = [
            ...acc,
            <Button css="pills" onClick={() => removeFilters(val)} key={val}>
              {val} <span className={styles.close}>X</span>
            </Button>,
          ])
        : acc,
    []
  );

  if (html.length > 0) {
    return (
      <div className={styles.pillCont}>
        {html}
        <Button css="link" onClick={() => removeFilters("all")}>
          Clear all
        </Button>
      </div>
    );
  }
  return null;
};

export default Pills;
