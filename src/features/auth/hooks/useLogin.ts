import { api } from "@/lib/api";
import { loginSchema, type LoginSchemaDTO } from "@/schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { LoginResponse } from "../dtos/login.dto";

export const useLogin = () => {
  const loginForm = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { isPending, mutateAsync: mutateLogin } = useMutation<
    LoginResponse,
    Error,
    LoginSchemaDTO
  >({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchemaDTO) => {
      const response = await api.post<LoginResponse>("/auth/login", data);
      setUser(response.data.data.user);
      Cookies.set("token", response.data.data.token, {
        expires: 1,
      });

      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something Went wrong!");
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate({ to: "/" });
    },
  });

  const onSubmit = async (data: LoginSchemaDTO) => {
    await mutateLogin(data);
  };

  return {
    loginForm,
    isPending,
    onSubmit,
  };
};
