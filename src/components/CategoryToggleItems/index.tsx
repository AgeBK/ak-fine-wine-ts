import Button from "../Button";
import styles from "./CategoryToggleItems.module.css";

type CategoryToggleItemsProps = {
  togglePageItems: () => void;
  isSmallScreen: boolean;
};

const CategoryToggleItems = ({
  togglePageItems,
  isSmallScreen,
}: CategoryToggleItemsProps) => {
  return (
    <div className={styles.smlScreen}>
      <Button css="filters" onClick={togglePageItems}>
        {isSmallScreen ? <span className={styles.close}>Filters</span> : "X"}
      </Button>
    </div>
  );
};

export default CategoryToggleItems;
