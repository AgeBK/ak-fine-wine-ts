import { MAX_CAROUSEL_PRODUCTS } from "./appData.json";

const hyphenate = (text: string | undefined) =>
  typeof text === "string" ? text.toLowerCase().replace(/ /gi, "-") : undefined;

const deHyphenate = (text: string) =>
  typeof text === "string" && text.toLowerCase().replace(/-/gi, " ");

const randomProducts = (arr: DataProps[]) =>
  arr.sort(() => 0.5 - Math.random());

const homePageCarouselProducts = (arr: DataProps[]): DataProps[] => {
  const products = arr
    .filter(({ price: { current, normal } }) => current !== normal)
    .slice(0, MAX_CAROUSEL_PRODUCTS);

  return randomProducts(products);
};

const productPageCarouselProducts = (arr: DataProps[], wineVariety: string) => {
  const products = arr
    .filter(({ variety }) => hyphenate(variety) === wineVariety)
    .slice(0, MAX_CAROUSEL_PRODUCTS);
  return randomProducts(products);
};

const checkDeals = (twoFor?: number, tenFor?: number, percentOff?: number) => {
  let deal = {};
  if (twoFor) {
    deal = { twoFor };
  } else if (tenFor) {
    deal = { tenFor };
  } else if (percentOff) {
    deal = { percentOff };
  }
  return deal;
};

const categoryURLs = {
  "price-drop": (all: DataProps[]) => {
    return all.filter(({ price: { current, normal } }) => current !== normal);
  },
  "two-for-deals": (all: DataProps[]) => {
    return all.filter(
      ({ promotion: { calloutText } }) =>
        calloutText && calloutText.startsWith("2 for")
    );
  },
  "ten-percent-off": (all: DataProps[]) => {
    return all.filter(
      ({ promotion: { calloutText } }) =>
        calloutText && calloutText.startsWith("10% OFF")
    );
  },
  "ten-and-less": (all: DataProps[]) => {
    return all.filter(({ price: { current } }) => current <= 10);
  },
  "ten-for-100": (all: DataProps[]) => {
    return all.filter(({ price: { tenFor } }) => tenFor === 100);
  },
  "two-for-price": (all: DataProps[], price: number) => {
    return all.filter(({ price: { twoFor } }) => twoFor === price);
  },
  urlVariety: (all: DataProps[], urlVariety: string) => {
    return all.filter(
      ({ variety, brand }) =>
        hyphenate(variety) === urlVariety || hyphenate(brand) === urlVariety
    );
  },
  search: (all: DataProps[], query: string) => {
    return all.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  },
  category: (all: DataProps[], urlCategory: string) => {
    return all.filter(({ category }) => category.toLowerCase() === urlCategory);
  },
};

const categoryPageData = (
  data: DataProps[],
  urlCategory: string,
  urlVariety?: string
) => {
  const sp = new URLSearchParams(location.pathname.substring(1));
  let arr: DataProps[] = [];
  let header: string = "";

  if (urlVariety) {
    // filter by wine variety or wine brand
    arr = categoryURLs["urlVariety"](data, urlVariety);
  } else if (sp.has("search")) {
    // filter by search param
    const query = sp.get("search");
    if (query) {
      arr = categoryURLs["search"](data, query);
      header = `results: ${query}`;
    }
  } else if (
    // filter by 2 for XX deals
    urlCategory.startsWith("two-for") &&
    urlCategory !== "two-for-deals"
  ) {
    const price = Number(urlCategory.split("-")[2]);
    arr = categoryURLs["two-for-price"](data, price);
    header = `2 for $${price}`;
  } else {
    switch (urlCategory) {
      case "two-for-deals":
        arr = categoryURLs["two-for-deals"](data);
        header = "2 for Deals";
        break;
      case "ten-percent-off":
        arr = categoryURLs["ten-percent-off"](data);
        header = "10% OFF";
        break;
      case "ten-and-less":
        arr = categoryURLs["ten-and-less"](data);
        header = "$10 and less";
        break;
      case "ten-for-100":
        arr = categoryURLs["ten-for-100"](data);
        header = "10 for $100";
        break;
      case "price-drop":
        arr = categoryURLs["price-drop"](data);
        break;
      case "white":
      case "red":
      case "sparkling":
        arr = categoryURLs["category"](data, urlCategory);
        break;
      default:
        break;
    }
  }
  arr.sort((a, b) => (a.ratings.average > b.ratings.average ? -1 : 1));
  return [arr, header];
};

const alphabetically = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const financially = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.price.current < b.price.current ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const saleItemsFirst = (arr: DataProps[]) => {
  arr.sort(({ price: { current, normal } }) => (current < normal ? -1 : 1));
  return arr;
};

const sortCategoryPageData = (arr: DataProps[], value: string) => {
  switch (value) {
    case "a-z":
      arr = alphabetically(arr, false);
      break;
    case "z-a":
      arr = alphabetically(arr, true);
      break;
    case "$":
      arr = financially(arr, false);
      break;
    case "$$$":
      arr = financially(arr, true);
      break;
    case "sale":
    case "relevance":
      arr = saleItemsFirst(arr);
      break;
    default:
      break;
  }
  return arr;
};

const filterCategoryPageData = (arr: DataProps[], filters: FilterProps) => {
  const { price, rating, variety, region } = filters;

  if (price) {
    const [min, max] = price.split("-");
    arr = arr.filter(
      ({ price: { current } }) =>
        current >= Number(min) && current < Number(max)
    );
  }

  if (rating) {
    arr = arr.filter(
      ({ ratings: { average } }) => Math.round(average) === Number(rating)
    );
  }

  if (variety) {
    arr = arr.filter(({ variety: wineType }) => wineType === variety);
  }

  if (region) {
    const checked = Object.keys(region).filter((key) => region[key]);
    if (checked.length) {
      arr = arr.filter(({ region }) => checked.includes(region));
    }
  }
  return arr;
};

export {
  hyphenate,
  deHyphenate,
  randomProducts,
  homePageCarouselProducts,
  productPageCarouselProducts,
  checkDeals,
  categoryURLs,
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
};
