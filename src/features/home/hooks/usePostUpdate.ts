import { api } from "@/lib/api";
import {
  updatePostSchema,
  type UpdatePostSchemaDTO,
} from "@/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { PostResponseDTO } from "../schemas/post.dto";

export const usePostUpdate = (postId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    inputRef.current && (inputRef.current.value = "");
  };

  const onSubmitPost = async (data: UpdatePostSchemaDTO) => {
    await mutatePostUpdate(data);
    setIsEditing(false);
    handleRemoveFile();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePostSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(updatePostSchema),
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = register("imageUrl");

  const { isPending: isPendingPostUpdate, mutateAsync: mutatePostUpdate } =
    useMutation<PostResponseDTO, Error, UpdatePostSchemaDTO>({
      mutationKey: ["post-update"],
      mutationFn: async (data: UpdatePostSchemaDTO) => {
        const formData = new FormData();
        formData.append("content", data.content);

        if (data.imageUrl && data.imageUrl.length > 0) {
          formData.append("images", data.imageUrl[0]);
        }

        const response = await api.patch<PostResponseDTO>(
          `/posts/${postId}`,
          formData
        );

        return response.data;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          return toast.error(error.response?.data.message);
        }
        toast.error("Something went wrong!");
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        toast.success("Post updated successfully!");
        reset();
        navigate({ to: "/" });
      },
    });

  return {
    register,
    handleSubmit,
    onSubmitPost,
    errors,
    inputRef,
    isEditing,
    previewURL,
    isPendingPostUpdate,
    setIsEditing,
    setPreviewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    registerImageRef,
    registerImageOnChange,
    ...restRegisterImage,
  };
};
