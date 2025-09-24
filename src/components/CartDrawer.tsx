import { useEffect } from "react";
import {
  useCart,
  useUpdateCartProductQuantity,
  useDeleteCartProduct,
} from "../api/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Icon from "../icons/Icon";
import Button from "./Button";
import Spinner from "./Spinner";
import type { CartProduct } from "../types/types";
import CartItem from "./CartItem";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const deleteProduct = useDeleteCartProduct();
  const queryClient = useQueryClient();
  const updateQuantity = useUpdateCartProductQuantity();

  useEffect(() => {
    if (updateQuantity.isSuccess || deleteProduct.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["cart", token] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuantity.isSuccess, deleteProduct.isSuccess, queryClient]);

  const token = localStorage.getItem("token") ?? undefined;
  const { data, isLoading, error } = useCart(token, open) as {
    data: CartProduct[];
    isLoading: boolean;
    error: {
      message: string;
    };
  };

  const subtotal = data?.reduce((acc, product) => acc + product.total_price, 0);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("avatar");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    }
  }, [error]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[540px] transform bg-white p-10 shadow-2xl ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        {isLoading && <Spinner />}

        {!isLoading && (
          <div className="mb-16 flex items-center justify-between">
            <h2 className="text-xl font-medium">
              Shopping cart (
              {data?.reduce((acc, product) => acc + product.quantity, 0) || 0})
            </h2>
            <button type="button" onClick={onClose} aria-label="Close cart">
              <Icon type="CloseIcon" className="size-8" />
            </button>
          </div>
        )}

        {error && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <img src="/cart-image.png" alt="cart image" className="mb-6" />
            <p className="mb-3 text-2xl font-semibold">Ooops!</p>
            <p className="mb-14 text-sm text-secondaryText">
              {(error as unknown as { response: { data: { message: string } } })
                ?.response?.data?.message || error.message}
            </p>

            <Button
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </Button>
          </div>
        )}

        {!isLoading && !error && data?.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <img src="/cart-image.png" alt="cart image" className="mb-6" />
            <p className="mb-3 text-2xl font-semibold">Ooops!</p>
            <p className="mb-14 text-sm text-secondaryText">
              You’ve got nothing in your cart just yet...
            </p>

            <Button onClick={onClose}>Start Shopping</Button>
          </div>
        )}

        {!isLoading && !error && data?.length > 0 && (
          <div className="relative flex h-full flex-col">
            <div className="flex flex-1 flex-col gap-9 overflow-y-auto pb-16 pr-3">
              {data.map((product) => (
                <CartItem
                  key={`${product.id}-${product.size}`}
                  product={product}
                  token={token as string}
                  updateQuantity={updateQuantity}
                  deleteProduct={deleteProduct}
                />
              ))}
            </div>
            <div className="sticky bottom-0 flex w-full flex-col gap-24 bg-white pb-10 pr-2 pt-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-secondaryText">Items subtotal</p>
                  <p className="text-secondaryText">$ {subtotal}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-secondaryText">Delivery</p>
                  <p className="text-secondaryText">$ 5</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium">Total</p>
                  <p className="text-xl font-medium">$ {subtotal + 5}</p>
                </div>
              </div>
              <Button onClick={() => (window.location.href = "/checkout")}>
                Go to checkout
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
