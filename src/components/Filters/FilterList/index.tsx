import PriceFilter from "../Price";
import RatingFilter from "../Rating";
import VarietyFilter from "../Variety";
import styles from "./FilterList.module.css";

type FilterListProps = {
  currentData: DataProps[];
  filters: FilterProps;
  urlVariety?: string;
  updateFilters: (filters: {
    variety?: string;
    price?: string;
    rating?: string;
  }) => void;
};

const FilterList = ({
  currentData,
  filters,
  urlVariety,
  updateFilters,
}: FilterListProps) => {

  const filterArr = [
    <PriceFilter
      updateFilters={updateFilters}
      filters={filters}
      key="PriceFilter"
    />,
    <RatingFilter
      filters={filters}
      updateFilters={updateFilters}
      key="RatingFilter"
    />,
  ];

  return (
    <section className={styles.container}>
      <div className={styles.hdrCont}>
        <h2 className={styles.hdr}>Refine:</h2>
      </div>
      <ul className={styles.filterList}>
        {filterArr.map((val) => {
          return <li key={val.key}>{val}</li>;
        })}
        {!urlVariety && (
          <li>
            <VarietyFilter
              updateFilters={updateFilters}
              filters={filters}
              currentData={currentData}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default FilterList;
