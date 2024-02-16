import Button from "../Button";
import { pageSizes } from "../../data/appData.json";

type ReslutPPProps = {
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

const ResultsPP = ({ paging, updatePaging }: ReslutPPProps) => {
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    updatePaging({
      page: 1,
      pageSize: Number(e.currentTarget.textContent),
    });
  };

  return pageSizes.map((val) => (
    <Button
      css="resultsPP"
      onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
      key={`btn${val}`}
    >
      {paging.pageSize === val ? <span>{val}</span> : val}
    </Button>
  ));
};

export default ResultsPP;
