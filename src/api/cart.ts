import axiosInstance from "../utils/axiosInstance";

interface AddToCartBody {
  quantity: number;
  color: string;
  size: string;
}

export async function addProductToCart(
  productId: number,
  quantity: number,
  color: string,
  size: string,
  token: string,
) {
  const body: AddToCartBody = { quantity, color, size };
  const response = await axiosInstance.post(
    `/cart/products/${productId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
