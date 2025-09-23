import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registerUser, type RegisterPayload } from "./auth";
import { loginUser, type LoginPayload } from "./auth";

export function useRegisterMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
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
      if (data?.user?.email) {
        localStorage.setItem("email", data.user.email);
      }
      navigate("/");
    },
    onError: (error: unknown) => {
      let message = "Registration failed.";
      type ErrorWithResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      const err = error as ErrorWithResponse;
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in err &&
        typeof err.response?.data?.message === "string"
      ) {
        message = err.response!.data!.message!;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        message = err.message!;
      }
      toast.error(message);
    },
  });
}

export function useLoginMutation() {
  const navigate = useNavigate();
  return useMutation({
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
      if (data?.user?.email) {
        localStorage.setItem("email", data.user.email);
      }
      navigate("/");
    },
    onError: (error: unknown) => {
      let message = "Login failed.";
      type ErrorWithResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      const err = error as ErrorWithResponse;
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in err &&
        typeof err.response?.data?.message === "string"
      ) {
        message = err.response!.data!.message!;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        message = err.message!;
      }
      toast.error(message);
    },
  });
}
