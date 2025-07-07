import { api } from "@/lib/api";
import {
  createPostSchema,
  type CreatePostSchemaDTO,
} from "@/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { PostResponseDTO } from "../schemas/post.dto";

export const usePostCreate = (onSuccess?: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleInputFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleRemoveFile = () => {
    setPreviewURL(null);
    inputRef.current!.value = "";
  };

  const onSubmitPost = async (data: CreatePostSchemaDTO) => {
    await mutatePostCreate(data);
    reset();
    handleRemoveFile();
    navigate({ to: "/" });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(createPostSchema),
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = register("imageUrl");

  const { isPending: isPendingPostCreate, mutateAsync: mutatePostCreate } =
    useMutation<PostResponseDTO, Error, CreatePostSchemaDTO>({
      mutationKey: ["post-create"],
      mutationFn: async (data: CreatePostSchemaDTO) => {
        const formData = new FormData();
        formData.append("content", data.content);
        if (data.imageUrl) {
          formData.append("images", data.imageUrl[0]);
        }
        const response = await api.post<PostResponseDTO>("/posts", formData);
        return response.data;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          return toast.error(error.response?.data.message);
        }
        toast.error("Something went wrong!");
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        onSuccess?.();
        toast.success(data.message);
      },
    });

  return {
    register,
    handleSubmit,
    onSubmitPost,
    errors,
    inputRef,
    previewURL,
    isPendingPostCreate,
    setPreviewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    registerImageRef,
    registerImageOnChange,
    ...restRegisterImage,
  };
};
