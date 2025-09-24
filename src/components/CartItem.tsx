import type { CartProduct } from "../types/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type {
  UseDeleteCartProductArgs,
  UseUpdateCartProductQuantityArgs,
} from "../api/useCart";
import ProductImage from "./ProductImage";

interface CartItemProps {
  product: CartProduct;
  token: string;
  updateQuantity: UseMutationResult<
    unknown,
    Error,
    UseUpdateCartProductQuantityArgs,
    unknown
  >;
  deleteProduct: UseMutationResult<
    unknown,
    Error,
    UseDeleteCartProductArgs,
    unknown
  >;
}

const CartItem = ({
  product,
  token,
  updateQuantity,
  deleteProduct,
}: CartItemProps) => {
  const colorIndex = product.available_colors.findIndex(
    (c) => c === product.color,
  );
  const imageSrc = product.images[colorIndex] || product.images[0];

  return (
    <div className="flex items-center gap-4">
      <ProductImage
        src={imageSrc}
        alt={product.name}
        className="h-32 w-24 cursor-pointer rounded-lg border border-borderColor object-cover"
        onClick={() => {
          window.location.href = `/products/${product.id}`;
        }}
      />
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-lg font-medium">$ {product.total_price}</p>
        </div>
        <p className="text-xs text-secondaryText">{product.color}</p>
        <p className="text-xs text-secondaryText">{product.size}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-borderColor px-2 py-1">
            <button
              type="button"
              className={`font-medium disabled:cursor-not-allowed disabled:text-borderColor ${
                product.quantity === 1
                  ? "text-borderColor"
                  : "text-secondaryText"
              } `}
              disabled={product.quantity === 1 || updateQuantity.isPending}
              onClick={() => {
                if (product.quantity > 1) {
                  updateQuantity.mutate({
                    productId: Number(product.id),
                    quantity: product.quantity - 1,
                    token: token as string,
                  });
                }
              }}
            >
              -
            </button>
            <span className="mx-4 text-sm font-medium">{product.quantity}</span>
            <button
              type="button"
              className="font-medium text-secondaryText disabled:cursor-not-allowed disabled:text-borderColor"
              disabled={updateQuantity.isPending}
              onClick={() => {
                updateQuantity.mutate({
                  productId: Number(product.id),
                  quantity: product.quantity + 1,
                  token: token as string,
                });
              }}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="text-sm text-secondaryText disabled:cursor-not-allowed"
            disabled={deleteProduct.isPending}
            onClick={() => {
              deleteProduct.mutate({
                productId: Number(product.id),
                token: token as string,
              });
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
