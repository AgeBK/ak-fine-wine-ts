import { useState, useEffect, useRef, useCallback } from "react";
import ProductItem from "../ProductItem";
import Button from "../Button";
import Img from "../Image";
import {
  MAX_CAROUSEL_PRODUCTS,
  SIX_CAROUSEL_ITEMS,
  FOUR_CAROUSEL_ITEMS,
  THREE_CAROUSEL_ITEMS,
  TWO_CAROUSEL_ITEMS,
  ONE_CAROUSEL_ITEM,
} from "../../data/appData.json";
import styles from "./Carousel.module.css";

const Carousel = ({ arr }: { arr: DataProps[] }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const totalPages: number = arr && arr.length / items - 1;

  const handleClick = (val: number): void =>
    setPageIndex((prev: number) => prev + val);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setPageIndex(Number(value));

  const calculateItems = useCallback((): void => {
    if (ref.current && ref.current.offsetWidth) {
      const {
        current: { offsetWidth },
      } = ref;

      let currentItems: number = 0;
      if (offsetWidth >= 1200) {
        currentItems = SIX_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 875) {
        currentItems = FOUR_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 650) {
        currentItems = THREE_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 380) {
        currentItems = TWO_CAROUSEL_ITEMS;
      } else {
        currentItems = ONE_CAROUSEL_ITEM;
      }
      if (currentItems !== items) setItems(currentItems);
    }
  }, [items]);

  useEffect(() => {
    calculateItems();
    window.addEventListener("resize", calculateItems);
    return () => window.removeEventListener("resize", calculateItems);
  }, [calculateItems]);

  const CarouselPaging = () => {
    if (items) {
      const html: Array<JSX.Element> = [];
      for (let i = 0; i < MAX_CAROUSEL_PRODUCTS / items; i++) {
        const id: string = `CarouselPaging${i}`;
        html.push(
          <span key={id}>
            <label htmlFor={id}>{`page ${i + 1}`}</label>
            <input
              type="radio"
              name="carouselPaging"
              id={id}
              value={i}
              onChange={handleChange}
              checked={i === pageIndex}
            />
          </span>
        );
      }
      return (
        <div className={styles.carouselPaging}>
          <Button
            css="pageNumber"
            onClick={() => handleClick(-1)}
            disabled={pageIndex <= 0}
          >
            &lt;
          </Button>
          {html}
          <Button
            css="pageNumber"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            &gt;
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.carousel} ref={ref}>
        <div className={`${styles.arrow} ${styles.arrowLeft}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(-1)}
            disabled={pageIndex <= 0}
          >
            <Img
              image={`icons/arrowLeft.png`}
              imageStyle="carousel"
              imageAlt="previous"
            />
          </Button>
        </div>
        {arr.map(
          (
            {
              id,
              category,
              variety,
              name,
              shortName,
              brand,
              ratings: { average },
              price: { current, normal, twoFor, tenFor, percentOff },
              promotion: { calloutText, discountCode },
            },
            ind
          ) => {
            if (ind >= pageIndex * items && ind < pageIndex * items + items) {
              return (
                <ProductItem
                  props={{
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
                    tenFor,
                    percentOff,
                    calloutText,
                    discountCode,
                  }}
                  key={id}
                  css={"carouselItems" + items}
                />
              );
            }
            return null;
          }
        )}
        <div className={`${styles.arrow} ${styles.arrowRight}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            <Img
              image={`icons/arrowRight.png`}
              imageStyle="carousel"
              imageAlt="next"
            />
          </Button>
        </div>
      </div>
      <CarouselPaging />
    </>
  );
};

export default Carousel;
