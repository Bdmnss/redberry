import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api/useAuth";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export default function Login() {
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

  const mutation = useLoginMutation();

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthLayout title="Login">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Input
            type="text"
            label="Email"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            isPassword
            label="Password"
            required
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
