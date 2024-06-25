import { useEffect, useState, useMemo, useRef } from "react";
import { useGetWinesQuery } from "../../services/API";
import { useParams } from "react-router-dom";
import usePageWidth from "../../hooks/usePageWidth";
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
  hyphenate,
} from "../../data/utils";
import { MAX_SMALLSCREEN, pagingSettings } from "../../data/appData.json";
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
  const [isShowItems, setIsShowItems] = useState<boolean>(false);
  const isSmallScreen: boolean = usePageWidth(MAX_SMALLSCREEN);
  const dataRef = useRef<DataProps[]>([]);
  const didMount = useRef<boolean>(false);
  const isSmallScreenShowItems = isSmallScreen && isShowItems;
  const { category: urlCategory, variety: urlVariety } =
    useParams<ParamProps>();
  let strHeader = "";

  useEffect(() => {
    if (didMount.current) {
      // reset page variables if URL changes, not on first load
      setSortName("");
      setFilters({});
      dataRef.current = [];
    } else {
      didMount.current = true;
    }
  }, [urlCategory, urlVariety]);

  if (data && urlCategory && dataRef.current.length === 0) {
    const variety = filters.variety || urlVariety;
    const [arr, header] = categoryPageData(data, urlCategory, variety);
    dataRef.current = arr as DataProps[];
    strHeader = header as string;
  }

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
    <>
      {urlCategory && (
        <Blurb
          urlCategory={urlCategory}
          variety={urlVariety || hyphenate(filters.variety)}
          header={strHeader}
        />
      )}
      {isSmallScreen && (
        <CategoryToggleItems
          togglePageItems={togglePageItems}
          isItems={isSmallScreenShowItems}
        />
      )}
      <div className={styles.category}>
        <div
          className={
            isSmallScreenShowItems ? styles.itemCont : styles.filterCont
          }
        >
          <FilterList
            currentData={dataRef.current}
            filters={filters}
            urlVariety={urlVariety}
            updateFilters={updateFilters}
          />
        </div>
        <div
          className={
            isSmallScreenShowItems ? styles.filterCont : styles.itemCont
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
    </>
  );
};
export default Category;
