import Button from "../Button";
import { pillsArr } from "../../data/appData.json";
import styles from "./Pills.module.css";

type PillsProps = {
  filters: FilterProps;
  removeFilters: (val: string) => void;
};

const Pills = ({ filters, removeFilters }: PillsProps) => {
  const isRegionChecked = (regionObj: KeyBooleanProps) =>
    Object.values(regionObj).some((val) => val);

  const html = pillsArr.reduce((acc: JSX.Element[], val: string) => {
    const currentFilter = filters[val as keyof FilterProps];
    if (currentFilter) {
      // for region filter, check object for true values
      const regionFilter =
        typeof currentFilter == "object" && isRegionChecked(currentFilter);

      if (currentFilter.length || regionFilter) {
        acc = [
          ...acc,
          <Button css="pills" onClick={() => removeFilters(val)} key={val}>
            {val} <span className={styles.close}>X</span>
          </Button>,
        ];
      }
    }
    return acc;
  }, []);

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
