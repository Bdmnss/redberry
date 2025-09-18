import axiosInstance from "../utils/axiosInstance";

export interface GetProductsParams {
  page?: number;
  price_from?: number;
  price_to?: number;
  sort?: string;
}

export async function getProducts(params: GetProductsParams = {}) {
  const query: Record<string, string | number> = {};
  if (params.page !== undefined) query.page = params.page;
  if (params.price_from !== undefined)
    query["filter[price_from]"] = params.price_from;
  if (params.price_to !== undefined)
    query["filter[price_to]"] = params.price_to;
  if (params.sort !== undefined) query.sort = params.sort;
  const response = await axiosInstance.get("/products", { params: query });
  return response.data;
}
