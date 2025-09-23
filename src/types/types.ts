export interface Product {
  id: string | number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
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
