import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginPayload } from "../api/auth";

export default function Login() {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      if (data?.user?.avatar) {
        localStorage.setItem("avatar", data.user.avatar);
      }
      if (data?.user?.username) {
        localStorage.setItem("username", data.user.username);
      }
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error", error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Input
            type="email"
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
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-secondaryText">
            Not a member?{" "}
            <Link to="/register" className="text-buttonColor">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
