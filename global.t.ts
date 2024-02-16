declare global {
  type DataProps = {
    id: string;
    name: string;
    brand: string;
    price: {
      normal: number;
      tenFor: number;
      twoFor: number;
      current: number;
      percentOff: number;
    };
    ratings: {
      total: number;
      average: number;
    };
    variety: string;
    category: string;
    volumeMl: number;
    packaging: string;
    promotion: {
      calloutText: string | undefined;
      discountCode: string | undefined;
    };
    shortName: string;
    unitOfMeasureLabel: string;
  };

  type ArrDataProps = DataProps[];

  type ArrDataPropsUndef = DataProps[] | undefined;

  type DealProps = {
    twoFor?: number;
    tenFor?: number;
    percentOff?: number;
  };

  // before item in cart
  type AddToCartProps = {
    id: string;
    name: string;
    brand: string;
    shortName: string;
    price: number;
    quantity: number;
    deal?: DealProps;
    discountCode?: string;
  };

  type CartItemProps = {
    name: string;
    brand: string;
    shortName: string;
    price: number;
    quantity: number;
    deal?: {
      twoFor?: number;
      tenFor?: number;
      percentOff?: number;
    };
    discountCode?: string;
    dealPrice?: number;
  };

  // item in cart
  type CartProps = {
    [id: string]: CartItemProps;
  };

  type FilterProps = { price?: string; variety?: string; rating?: string };

  type TextValueArrProps = { text: string; value: string };

  type PagingProps = { page: number; pageSize: number };

  type KeyStringProps = { [key: string]: string };

  type KeyNumberProps = { [key: string]: number };

  interface WineFilterProps {
    updateFilters: (filters: FilterProps) => void;
    filters: FilterProps;
  }
}

export {};

// TODO: Generics version here vs below version??
// type DataProps = Array<{
//   id: string;
//   name: string;
//   brand: string;
//   price: {
//     normal: number;
//     tenFor: number;
//     twoFor: number;
//     current: number;
//     percentOff: number;
//   };
//   ratings: {
//     total: number;
//     average: number | string;
//   };
//   variety: string;
//   category: string;
//   volumeMl: number;
//   packaging: string;
//   promotion: {
//     calloutText: string | null;
//   };
//   shortName: string;
//   unitOfMeasureLabel: string;
// }>;
