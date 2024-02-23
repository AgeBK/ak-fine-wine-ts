import { useEffect, useState, useMemo, useRef } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams } from "react-router-dom";
import useMobileView from "../../hooks/useMobileView";
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
} from "../../data/utils";
import {
  MAX_MOBILE_WIDTH,
  pagingSettings,
  mobileViewSettings,
} from "../../data/appData.json";
import CategoryList from "../CategoryList";
import { Blurb } from "../Blurb";
import CategoryHeader from "../CategoryHeader";
import CategoryToggleItems from "../CategoryToggleItems";
import CategoryPaging from "../CategoryPaging";
import CategoryNoResults from "../CategoryNoResults";
import FilterList from "../Filters/FilterList";
import styles from "./Category.module.css";

type ParamProps = {
  category: string;
  variety: string;
};

const Category = () => {
  const { data } = useGetWinesQuery();
  const [sortName, setSortName] = useState<string>("");
  const [filters, setFilters] = useState<FilterProps>({});
  const [paging, setPaging] = useState<PagingProps>(pagingSettings);
  const { category: urlCategory, variety: urlVariety } =
    useParams<ParamProps>();
  const isSmallScreen: boolean = useMobileView(MAX_MOBILE_WIDTH);
  const dataRef = useRef<DataProps[]>([]);
  const headerRef = useRef<string>("");
  const didMount = useRef<boolean>(false);
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  useEffect(() => {
    console.log("UE Main");

    if (didMount.current) {
      // reset filters/sort variables if URL changes
      setSortName("");
      setFilters({});
      dataRef.current = [];
      headerRef.current = "";
    } else {
      didMount.current = true;
    }
  }, [urlCategory, urlVariety]);

  if (data && urlCategory && dataRef.current.length === 0) {
    console.log("dataRef.current.length === 0");
    const [arr, header] = categoryPageData(data, urlCategory, urlVariety);
    dataRef.current = arr as DataProps[];
    headerRef.current = header as string;
  }

  const currentData = useMemo(() => {
    console.log("currentData");
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

  const pagedData = currentData.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  );

  const updateFilters = (filter: FilterProps) =>
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
    setIsShowItems((prev) => !prev);
  };

  return (
    <article>
      <Blurb
        urlCategory={urlCategory}
        urlVariety={urlVariety}
        header={headerRef.current}
      />
      {isSmallScreen && (
        <CategoryToggleItems
          togglePageItems={togglePageItems}
          isSmallScreen={isSmallScreen}
        />
      )}
      <div className={styles.category}>
        <div
          className={
            isSmallScreen && isShowItems ? styles.itemCont : styles.filterCont
          }
        >
          <FilterList
            updateFilters={updateFilters}
            filters={filters}
            currentData={currentData}
          />
        </div>
        <div
          className={
            isSmallScreen && isShowItems ? styles.filterCont : styles.itemCont
          }
        >
          <section className={styles.categoryItems}>
            <CategoryHeader
              filters={filters}
              removeFilters={removeFilters}
              dataLength={currentData.length}
              sortName={sortName}
              setSortName={setSortName}
            />
            {currentData.length > 0 ? (
              <>
                <CategoryList arr={pagedData} />
                <CategoryPaging
                  currentData={currentData}
                  paging={paging}
                  updatePaging={updatePaging}
                />
              </>
            ) : (
              <CategoryNoResults />
            )}
          </section>
        </div>
      </div>
    </article>
  );
};
export default Category;
