import { useParams } from "react-router-dom";
import { productPageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import { blurb, reviews, productSource } from "../../data/appData.json";
import ProductCart from "../ProductCart";
import Img from "../Image";
import ProductInfo from "../ProductInfo";
import Carousel from "../Carousel";
import BreadCrumb from "../BreadCrumb";
import styles from "./Product.module.css";

type ProductProps = {
  category: string;
  variety: string;
  id: string;
};

const WineBlurb = ({
  urlCategory,
  urlVariety,
}: {
  urlCategory: string | undefined;
  urlVariety: string | undefined;
}) => {
  const wineData: KeyStringProps = blurb;
  let synopsis = "";
  if (urlVariety && wineData[urlVariety]) {
    synopsis = wineData[urlVariety];
  } else if (urlCategory && wineData[urlCategory]) {
    synopsis = wineData[urlCategory];
  }
  return synopsis;
};

function Product() {
  const {
    category: urlCategory,
    variety: urlVariety,
    id: urlId,
  } = useParams<ProductProps>();
  const { data } = useGetWinesQuery();
  const product = data?.find(({ id }:DataProps) => id === urlId);
  const review: KeyStringProps = reviews;

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
          <section className={styles.productCont}>
            <div className={styles.productImg}>
              <Img
                image={`wine/${id}.jpg`}
                imageStyle="productMain"
                imageAlt="AK Fine Wines"
              />
            </div>
            <div className={styles.productMeta}>
              <h1 className={styles.brand}>{brand}</h1>
              <h2 className={styles.shortName}>{shortName}</h2>
              <div className={styles.productBlurb}>
                <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
              </div>
              {average && Math.round(average) > 2 ? (
                <>
                  <Img
                    image={`bg/${Math.round(average)}starLge.png`}
                    imageStyle=" "
                    imageAlt={`${Math.round(average)} star rating`}
                  />
                  <div className={styles.totalRate}>{total} Reviews</div>
                </>
              ) : null}
              <ProductCart
                id={id}
                name={name}
                brand={brand}
                shortName={shortName}
                twoFor={twoFor}
                tenFor={tenFor}
                percentOff={percentOff}
                current={current}
                packaging={packaging}
                calloutText={calloutText}
                discountCode={discountCode}
              />
            </div>
          </section>
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
          <div className={styles.reviews}>
            <h2>Product Review:</h2>
            {urlCategory && review[urlCategory]}
            <div
              className={styles.source}
              dangerouslySetInnerHTML={{
                __html: productSource.replace("[variety]", variety),
              }}
            ></div>
          </div>
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

export default Product;
