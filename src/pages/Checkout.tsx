import { useEffect, useState } from "react";
import {
  useCart,
  useDeleteCartProduct,
  useUpdateCartProductQuantity,
  useCartCheckout,
  type CartCheckoutBody,
} from "../api/useCart";
import CartItem from "../components/CartItem";
import type { CartProduct } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../components/Button";
import Input from "../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SuccessModal from "../components/SuccessModal";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

const schema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(3, "Name is required"),
  surname: z.string().min(3, "Surname is required"),
  address: z.string().min(3, "Address is required"),
  zip_code: z.string().min(4, "Zip code is required"),
});

const Checkout = () => {
  useEffect(() => {
    document.title = "RedSeam | Checkout";
  }, []);

  const [isSuccess, setIsSuccess] = useState(false);

  const deleteProduct = useDeleteCartProduct();
  const queryClient = useQueryClient();
  const updateQuantity = useUpdateCartProductQuantity();
  const cartCheckout = useCartCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
      name: "",
      surname: "",
      address: "",
      zip_code: "",
    },
  });

  const token = localStorage.getItem("token") ?? undefined;
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    if (updateQuantity.isSuccess || deleteProduct.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["cart", token] });
    }
  }, [token, updateQuantity.isSuccess, deleteProduct.isSuccess, queryClient]);

  const { data, isLoading, error } = useCart(token) as {
    data: CartProduct[];
    isLoading: boolean;
    error: {
      message: string;
    };
  };

  const subtotal = data?.reduce((acc, product) => acc + product.total_price, 0);

  const onSubmit = (formData: CartCheckoutBody) => {
    if (token) {
      const fixedFormData = { ...formData, email: formData.email ?? "" };
      cartCheckout.mutate({ token, body: fixedFormData });
      setIsSuccess(true);
    }
  };

  const onClose = () => {
    window.location.href = "/";
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorScreen message={`Error: ${(error as Error).message}`} />;
  }
  if (!data) {
    return <ErrorScreen message="No data available." />;
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[39.6875rem] w-full flex-col items-center justify-center">
        <img
          src="/cart-image.png"
          alt="cart image"
          className="mb-10 h-52 w-64"
        />
        <p className="mb-6 text-4xl font-bold">Ooops!</p>
        <p className="mb-20 text-lg text-secondaryText">
          You’ve got nothing in your cart just yet...
        </p>
        <Button className="h-16 w-64 text-xl font-semibold" onClick={onClose}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <main className="relative px-24 py-16">
      <h1 className="mb-10 text-4xl font-semibold">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="h-[39.6875rem] w-[70.5625rem] rounded-2xl bg-grey px-12 py-20">
            <h3 className="mb-11 text-2xl font-medium text-secondaryText">
              Order details
            </h3>
            <div className="flex w-[36.125rem] flex-col gap-8">
              <div className="flex gap-6">
                <Input
                  label="Name"
                  {...register("name")}
                  error={errors.name?.message}
                />
                <Input
                  label="Surname"
                  {...register("surname")}
                  error={errors.surname?.message}
                />
              </div>
              <Input
                label="Email"
                isEmail
                {...register("email")}
                error={errors.email?.message}
              />
              <div className="flex gap-6">
                <Input
                  label="Address"
                  {...register("address")}
                  error={errors.address?.message}
                />
                <Input
                  type="number"
                  label="Zip code"
                  {...register("zip_code")}
                  error={errors.zip_code?.message}
                />
              </div>
            </div>
          </div>
          <div className="h-[39.6875rem] w-[28.75rem]">
            <div className="flex h-[21.9375rem] flex-1 flex-col gap-9 overflow-y-auto pr-2">
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
            <div className="my-16 flex flex-col gap-4">
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
            <Button type="submit">Pay</Button>
          </div>
        </div>
      </form>

      {isSuccess && <SuccessModal onClose={onClose} />}
    </main>
  );
};

export default Checkout;
