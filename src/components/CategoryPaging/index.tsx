import CategoryPageNumber from "../CategoryPageNumber";
import ResultsPP from "../ResultsPP";
import styles from "./CategoryPaging.module.css";

type CategoryPagingProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

const CategoryPaging = ({
  currentData,
  paging,
  updatePaging,
}: CategoryPagingProps) => {
  return (
    <div className={styles.categoryPaging}>
      <div className={styles.pageNumCont}>
        <CategoryPageNumber
          currentData={currentData}
          paging={paging}
          updatePaging={updatePaging}
        />
      </div>
      <ResultsPP paging={paging} updatePaging={updatePaging} />
    </div>
  );
};

export default CategoryPaging;
