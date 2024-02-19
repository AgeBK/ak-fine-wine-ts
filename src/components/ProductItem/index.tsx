import { Link } from "react-router-dom";
import { hyphenate, checkDeals } from "../../data/utils";
import AddToCart from "../AddToCart";
import Img from "../Image";
import PriceDrop from "../PriceDrop";
import Price from "../Price";
import styles from "./ProductItem.module.css";

type ProductItemProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    shortName: string;
    brand: string;
    average: number;
    current: number;
    normal: number;
    twoFor?: number;
    percentOff?: number;
    tenFor?: number;
    calloutText?: string;
    discountCode?: string;
  };
  css?: string;
};

const ProductItem = ({ props, css }: ProductItemProps) => {
  const {
    id,
    category,
    variety,
    name,
    shortName,
    brand,
    average,
    current,
    normal,
    twoFor,
    percentOff,
    tenFor,
    calloutText,
    discountCode,
  } = props;

  const deal: DealProps = checkDeals(twoFor, tenFor, percentOff);
  const onSpecial: number | null = current !== normal ? current : null;
  const path = `./src/assets/img/wine/${id}.jpg`;

  return (
    <div className={`${styles.product} ${css ? styles[css] : ""}`} key={id}>
      {calloutText || onSpecial ? (
        <PriceDrop calloutText={calloutText} />
      ) : null}
      <Link
        to={`/${category.toLowerCase()}/${hyphenate(
          variety.toLowerCase()
        )}/${id}`}
        className={styles.itemCont}
      >
        <img
          src="./src/assets/img/wine/4267851.jpg"
          style={{ height: "30px", width: "30px" }}
          alt="Moscato 750ml"
        />
        <img
          src="./src/assets/img/${id}/4267851.jpg"
          style={{ height: "30px", width: "30px" }}
          alt={shortName}
        />
        <img
          src={`./src/assets/img/${id}/4267851.jpg`}
          style={{ height: "30px", width: "30px" }}
          alt={shortName}
        />
        <img
          src="./src/assets/img/wine/4267851.jpg"
          style={{ height: "30px", width: "30px" }}
          alt="Moscato 750ml"
        />
        <img src={path} style={{ height: "150px" }} alt="Moscato 750ml" />
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.shortName}>{shortName}</h3>
          {average && Math.round(average) > 2 ? (
            <Img
              image={`bg/${Math.round(average)}star.jpg`}
              imageStyle="block"
              imageAlt={shortName}
            />
          ) : null}
        </div>
      </Link>
      <Price current={current} normal={normal} />
      <div className={styles.addCont}>
        <AddToCart
          id={id}
          name={name}
          brand={brand}
          shortName={shortName}
          price={current}
          quantity={1}
          deal={deal}
          discountCode={discountCode}
        />
      </div>
    </div>
  );
};

export default ProductItem;
