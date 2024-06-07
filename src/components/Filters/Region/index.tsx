import { ChangeEvent } from "react";
import styles from "./RegionFilter.module.css";

interface RegionFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

const RegionFilter = ({
  updateFilters,
  filters,
  currentData,
}: RegionFilterProps) => {
  const currentRegions: KeyNumberProps = currentData.reduce((acc, val) => {
    const r: string = val.region as string;
    if (!acc[r]) acc = { ...acc, [r]: 0 };
    acc[r] += 1;
    return acc;
  }, {} as KeyNumberProps);

  const sortedArr = Object.entries(currentRegions).sort(
    ([, a], [, b]) => b - a
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    updateFilters({
      ...filters,
      region: { ...filters.region, [value]: checked },
    });
  };

  return (
    <>
      <h3 className={styles.hdr}>Region:</h3>
      {sortedArr.length > 0 ? (
        <ul role="radiogroup">
          {sortedArr.map(([reg, amount]) => (
            <li key={reg}>
              <input
                type="checkbox"
                id={reg}
                name="region"
                value={reg}
                checked={(filters.region && filters.region[reg]) || false}
                className={styles.radio}
                onChange={handleChange}
              />
              <label htmlFor={reg}>
                {reg} <span className={styles.amount}>({amount})</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
};

export default RegionFilter;
