import { api } from "@/lib/api";
import { registerSchema, type RegisterSchemaDTO } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { RegisterResponse } from "../dtos/register.dto";

export const useRegister = () => {
  const registerForm = useForm<RegisterSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation<
    RegisterResponse,
    Error,
    RegisterSchemaDTO
  >({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const response = await api.post<RegisterResponse>("/auth/register", data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate({ to: "/login" });
    },
  });

  const onSubmit = async (data: RegisterSchemaDTO) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return {
    registerForm,
    isPending,
    onSubmit,
  };
};
