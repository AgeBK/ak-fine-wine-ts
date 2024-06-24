import { ChangeEvent } from "react";
import { filterCategoryPageData } from "../../../data/utils";
import Button from "../../Button";
import styles from "./VarietyFilter.module.css";

interface VarietyFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

const VarietyFilter = ({
  updateFilters,
  filters,
  currentData,
}: VarietyFilterProps) => {
  const filteredData = filterCategoryPageData(currentData, filters);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ variety: value });

  const varietys: KeyNumberProps = filteredData.reduce((acc, { variety }) => {
    acc[variety] = (acc[variety] || 0) + 1;
    return acc;
  }, {} as KeyNumberProps);

  const sortedArr = Object.entries(varietys).sort(([, a], [, b]) => b - a);

  return (
    <>
      <h3 className={styles.hdr}>Variety:</h3>
      {sortedArr.length > 0 ? (
        <ul role="radiogroup">
          {sortedArr.map(([variety, amount]) => (
            <li key={variety}>
              <input
                type="radio"
                id={variety}
                name="variety"
                value={variety}
                checked={filters.variety === variety}
                className={styles.radio}
                onChange={handleChange}
              />
              <label htmlFor={variety}>
                {variety} <span className={styles.amount}> ({amount})</span>
              </label>
              {filters.variety === variety && (
                <span className={styles.clear}>
                  <Button
                    css="linkLight"
                    onClick={() => updateFilters({ variety: "" })}
                  >
                    Clear
                  </Button>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
};

export default VarietyFilter;
