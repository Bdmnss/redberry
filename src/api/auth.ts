import axiosInstance from "../utils/axiosInstance";

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}

export async function registerUser(payload: RegisterPayload) {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("username", payload.username);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);
  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }
  const response = await axiosInstance.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
