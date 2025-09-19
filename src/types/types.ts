export interface Product {
  id: string | number;
  name: string;
  price: number;
  cover_image: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    to: number;
    from: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}
