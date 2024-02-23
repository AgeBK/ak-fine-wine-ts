import { useParams } from "react-router-dom";
import { productPageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import ProductDetails from "../ProductDetails";
import ProductReview from "../ProductReview";
import ProductInfo from "../ProductInfo";
import Carousel from "../Carousel";
import BreadCrumb from "../BreadCrumb";

import styles from "./Product.module.css";

type ParamProps = {
  category: string;
  variety: string;
  id: string;
};

function Product() {
  const {
    category: urlCategory,
    variety: urlVariety,
    id: urlId,
  } = useParams<ParamProps>();
  const { data } = useGetWinesQuery();

  if (data) {
    const product = data.find(({ id }: DataProps) => id === urlId);

    if (product) {
      const {
        id,
        category,
        variety,
        name,
        shortName,
        brand,
        packaging,
        unitOfMeasureLabel,
        ratings: { average, total },
        price: { current, normal, twoFor, percentOff, tenFor },
        promotion: { calloutText, discountCode },
      } = product;

      return (
        <article>
          <div className={styles.container}>
            <BreadCrumb
              urlCategory={urlCategory}
              urlVariety={urlVariety}
              category={category}
              variety={variety}
            />
            <ProductDetails
              id={id}
              name={name}
              shortName={shortName}
              brand={brand}
              packaging={packaging}
              current={current}
              twoFor={twoFor}
              tenFor={tenFor}
              percentOff={percentOff}
              calloutText={calloutText}
              discountCode={discountCode}
              average={average}
              total={total}
              urlCategory={urlCategory}
              urlVariety={urlVariety}
            />
            <ProductInfo
              id={id}
              category={category}
              variety={variety}
              brand={brand}
              packaging={packaging}
              unitOfMeasureLabel={unitOfMeasureLabel}
              current={current}
              normal={normal}
              shortName={shortName}
              urlCategory={urlCategory}
            />
            <ProductReview urlCategory={urlCategory} variety={variety} />
            <section className={styles.similar}>
              <h2>Similar Products:</h2>
              {urlVariety && (
                <Carousel arr={productPageCarouselProducts(data, urlVariety)} />
              )}
            </section>
          </div>
        </article>
      );
    }
    return null;
  }
  return null;
}

export default Product;
