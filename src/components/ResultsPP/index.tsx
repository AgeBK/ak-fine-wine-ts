import Button from "../Button";
import { pageSizes } from "../../data/appData.json";
import styles from "./ResultsPP.module.css";

type ReslutPPProps = {
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

const ResultsPP = ({ paging, updatePaging }: ReslutPPProps) => {
  const handleClick = ({
    currentTarget: { textContent },
  }: React.MouseEvent<Element, MouseEvent>) => {
    updatePaging({
      page: 1,
      pageSize: Number(textContent),
    });
  };

  return (
    <div className={styles.resultsPPCont}>
      <div className={styles.resultsPP}>Results per page:</div>
      <div className={styles.resultsPPBtns}>
        {pageSizes.map((val) => (
          <Button
            css="resultsPP"
            onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
              handleClick(e)
            }
            key={`btn${val}`}
          >
            {paging.pageSize === val ? <span>{val}</span> : val}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ResultsPP;
