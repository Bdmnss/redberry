import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <AuthLayout title="Registration">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <img src="/profile-image.png" alt="profile image" />
          <button type="button" className="text-secondaryText">
            Upload new
          </button>
          <button type="button" className="text-secondaryText">
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
          <Button>Register</Button>
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
