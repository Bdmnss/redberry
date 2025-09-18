import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

import Button from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { registerUser, type RegisterPayload } from "../api/auth";

export default function Register() {
  const schema = z
    .object({
      username: z.string().min(2, "Username is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration error", error);
    },
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      email: data.email,
      username: data.username,
      password: data.password,
      password_confirmation: data.confirmPassword,
      avatar,
    });
  };

  return (
    <AuthLayout title="Registration">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <img
            src={avatar ? URL.createObjectURL(avatar) : "/profile-image.png"}
            alt="profile image"
            className="size-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAvatar(file);
            }}
          />
          <button
            type="button"
            className="text-secondaryText"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload new
          </button>
          <button
            type="button"
            className="text-secondaryText"
            onClick={() => setAvatar(null)}
            disabled={!avatar}
          >
            Remove
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Username"
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            type="text"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            isPassword
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            isPassword
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
          <p className="text-secondaryText">
            Already member?{" "}
            <Link to="/login" className="text-buttonColor">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
