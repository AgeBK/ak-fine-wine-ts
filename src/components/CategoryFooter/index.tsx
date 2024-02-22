import React from "react";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./CategoryFooter.module.css";

type CategoryFooterProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

const CategoryFooter = ({
  currentData,
  paging,
  updatePaging,
}: CategoryFooterProps) => {
  return (
    <div className={styles.categoryFooter}>
      <div className={styles.pageNumCont}>
        <PageNumber
          currentData={currentData}
          paging={paging}
          updatePaging={updatePaging}
        />
      </div>
      <ResultsPP paging={paging} updatePaging={updatePaging} />
    </div>
  );
};

export default CategoryFooter;
