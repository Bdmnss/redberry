import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addProductToCart,
  getCart,
  updateCartProductQuantity,
  deleteCartProduct,
  postCartCheckout,
} from "./cart";

import { toast } from "react-hot-toast";

interface UseAddToCartArgs {
  productId?: number;
  quantity: number;
  color: string;
  size: string;
  token?: string;
}

export interface UseUpdateCartProductQuantityArgs {
  productId: number;
  quantity: number;
  token: string;
}

export interface UseDeleteCartProductArgs {
  productId: number;
  token: string;
}

export interface CartCheckoutBody {
  email?: string;
  name: string;
  surname: string;
  address: string;
  zip_code: string;
}

export function useAddToCart() {
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
      color,
      size,
      token,
    }: UseAddToCartArgs) => {
      return addProductToCart(
        productId as number,
        quantity,
        color,
        size,
        token as string,
      );
    },
    onError: (err: unknown) => {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add to cart",
      );
    },
    onSuccess: (_data, variables) => {
      toast.success(
        `${variables.quantity} product${variables.quantity > 1 ? "s" : ""} added to cart`,
      );
    },
  });
}

export function useCart(token?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCart(token as string),
    enabled: !!token && enabled,
  });
}

export function useUpdateCartProductQuantity() {
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
      token,
    }: UseUpdateCartProductQuantityArgs) => {
      return updateCartProductQuantity(productId, quantity, token);
    },
  });
}

export function useDeleteCartProduct() {
  return useMutation({
    mutationFn: ({ productId, token }: UseDeleteCartProductArgs) => {
      return deleteCartProduct(productId, token);
    },
  });
}

export function useCartCheckout() {
  return useMutation({
    mutationFn: ({ token, body }: { token: string; body: CartCheckoutBody }) =>
      postCartCheckout(token, body),
  });
}
