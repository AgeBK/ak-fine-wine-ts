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
    region: string;
    volumeMl: number;
    packaging: string;
    promotion: {
      calloutText: string | undefined;
      discountCode: string | undefined;
    };
    shortName: string;
    unitOfMeasureLabel: string;
  };

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

  type TextValueArrProps = { text: string; value: string };

  type PagingProps = { page: number; pageSize: number };

  type KeyStringProps = { [key: string]: string };

  type KeyNumberProps = { [key: string]: number };

  type KeyBooleanProps = { [key: string]: boolean };

  type FilterProps = {
    price?: string;
    variety?: string;
    rating?: string;
    region?: KeyBooleanProps;
  };

  interface WineFilterProps {
    updateFilters: (filters: FilterProps) => void;
    filters: FilterProps;
  }
}

export {};
