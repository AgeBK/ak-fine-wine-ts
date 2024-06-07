import { ChangeEvent } from "react";
import styles from "./PriceFilter.module.css";
import { priceArr } from "../../../data/appData.json";

const PriceFilter = ({ updateFilters, filters }: WineFilterProps) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ price: value });
  const arr: TextValueArrProps[] = priceArr;

  return (
    <>
      <h3 className={styles.hdr}>Price:</h3>
      <ul role="radiogroup">
        {arr.map(({ text, value }) => (
          <li key={value}>
            <input
              type="radio"
              id={value}
              name="price"
              value={value}
              checked={filters.price === value}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor={value} className={styles.label}>
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PriceFilter;
