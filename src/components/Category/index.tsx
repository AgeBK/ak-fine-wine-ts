import { useEffect, useState, useMemo, useRef } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams, Link } from "react-router-dom";
import useMobileView from "../../hooks/useMobileView";
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
} from "../../data/utils";
import {
  MAX_MOBILE_WIDTH,
  pagingSettings,
  filterSettings,
  mobileViewSettings,
} from "../../data/appData.json";
import ProductList from "../ProductList";
import { Sort } from "../Sort";
import Pills from "../Pills";
import { Blurb } from "../Blurb";
import PageNumber from "../PageNumber";
import ResultsPP from "../ResultsPP";
import FilterList from "../Filters/FilterList";
import Button from "../Button";
import styles from "./Category.module.css";

// TODO: check alt tags
type MobileViewProps = {
  filters: boolean;
  items: boolean;
};

const Category = () => {
  // ** Work flow **
  // Get data (useGetWinesQuery - Array of objects) from Redux API slice
  // Initial filter: filter the data (categoryPageData function) depending what URL I come into the component with. eg: http://localhost:5000/red - red wines
  // Check to see if any filters or sorting has been applied
  // I create an array depending on how many items per page is selected which is then rendered

  const { data } = useGetWinesQuery();
  const [sortName, setSortName] = useState<string>("");
  const [filters, setFilters] = useState<FilterProps>(filterSettings);
  const [paging, setPaging] = useState<PagingProps>(pagingSettings);
  const [mobileView, setMobileView] =
    useState<MobileViewProps>(mobileViewSettings);
  const { category: urlCategory, variety: urlVariety } = useParams();
  const isMobileView: boolean = useMobileView(MAX_MOBILE_WIDTH);
  const dataRef = useRef<DataProps[]>([]);
  const headerRef = useRef<string>("");

  useEffect(() => {
    setMobileView({ filters: !isMobileView, items: true });
  }, [isMobileView]);

  useEffect(() => {
    // reset page if URl changes
    setSortName("");
    setFilters({});
    dataRef.current = [];
    headerRef.current = "";
  }, [urlCategory, urlVariety]);

  const currentData = useMemo(() => {
    setPaging(pagingSettings);
    let arr = [...dataRef.current];
    if (arr.length) {
      if (Object.keys(filters).length) {
        arr = filterCategoryPageData(arr, filters);
      }
      if (sortName) {
        arr = sortCategoryPageData(arr, sortName);
      }
    }
    return arr;
  }, [filters, sortName]);

  if (data && Array.isArray(data)) {
    if (dataRef.current.length === 0 && urlCategory) {
      const [arr, header] = categoryPageData(data, urlCategory, urlVariety);
      dataRef.current = arr as DataProps[];
      headerRef.current = header as string;
    }

    const pagedData = currentData.slice(
      (paging.page - 1) * paging.pageSize,
      paging.page * paging.pageSize
    );

    const updateFilters = (filter: object) =>
      setFilters({ ...filters, ...filter });

    const removeFilters = (val: string) => {
      if (val === "all") {
        setFilters({});
      } else {
        delete filters[val as keyof FilterProps];
        setFilters({ ...filters });
      }
    };

    const updatePaging = ({ page, pageSize }: PagingProps) => {
      window.scrollTo(0, 0);
      setPaging({ page, pageSize });
    };

    const togglePageItems = () => {
      // either show filters or items on small screen
      const { filters, items } = mobileView;
      setMobileView({ filters: !filters, items: !items });
    };

    return (
      <article>
        <section className={styles.categoryBlurb}>
          <Blurb
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            header={headerRef.current}
          />
        </section>
        {isMobileView && (
          <div className={styles.smlScreen}>
            <Button css="filters" onClick={togglePageItems}>
              {mobileView.filters ? (
                <span className={styles.close}>X</span>
              ) : (
                "Filters"
              )}
            </Button>
          </div>
        )}
        <div className={styles.category}>
          {mobileView.filters && (
            <FilterList
              updateFilters={updateFilters}
              filters={filters}
              currentData={currentData}
            />
          )}
          {mobileView.items && (
            <section className={styles.categoryItems}>
              <div className={styles.detailsCont}>
                <Pills filters={filters} removeFilters={removeFilters} />
                <span className={styles.results}>
                  ({currentData.length}) Available
                </span>
                <div className={styles.sort}>Sort:</div>
                <Sort sortName={sortName} setSortName={setSortName} />
              </div>
              {currentData.length > 0 ? (
                <>
                  <ProductList arr={pagedData} />
                  <div className={styles.categoryFooter}>
                    <div className={styles.pageNumCont}>
                      <PageNumber
                        currentData={currentData}
                        paging={paging}
                        updatePaging={updatePaging}
                      />
                    </div>
                    <div className={styles.resultsPPCont}>
                      <div className={styles.resultsPP}>Results per page:</div>
                      <div className={styles.resultsPPBtns}>
                        <ResultsPP
                          paging={paging}
                          updatePaging={updatePaging}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.noResults}>
                  Sorry, no results:
                  <br />
                  <Link to="/" className={styles.link}>
                    Back to homepage
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>
      </article>
    );
  }
  return null;
};
export default Category;
