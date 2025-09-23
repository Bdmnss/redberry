import { useMutation } from "@tanstack/react-query";
import { addProductToCart } from "./cart";
import { toast } from "react-hot-toast";

interface UseAddToCartArgs {
  productId?: number;
  quantity: number;
  color: string;
  size: string;
  token?: string;
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
