import Button from "../Button";
import styles from "./CategoryToggleItems.module.css";

type CategoryToggleItemsProps = {
  togglePageItems: () => void;
  mobileView: {
    filters: boolean;
  };
};

const CategoryToggleItems = ({
  togglePageItems,
  mobileView,
}: CategoryToggleItemsProps) => {
  return (
    <div className={styles.smlScreen}>
      <Button css="filters" onClick={togglePageItems}>
        {mobileView.filters ? (
          <span className={styles.close}>X</span>
        ) : (
          "Filters"
        )}
      </Button>
    </div>
  );
};

export default CategoryToggleItems;
