import axiosInstance from "../utils/axiosInstance";
import type { CartCheckoutBody } from "./useCart";

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

export async function getCart(token: string) {
  const response = await axiosInstance.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateCartProductQuantity(
  productId: number,
  quantity: number,
  token: string,
) {
  const response = await axiosInstance.patch(
    `/cart/products/${productId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteCartProduct(productId: number, token: string) {
  const response = await axiosInstance.delete(`/cart/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postCartCheckout(token: string, body: CartCheckoutBody) {
  const response = await axiosInstance.post("/cart/checkout", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
