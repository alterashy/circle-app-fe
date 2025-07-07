import { api } from "@/lib/api";
import type { LikeDTO, UnlikeDTO } from "@/schemas/like.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { LikeResponseDTO } from "../schemas/like.dto";

export const usePostLike = () => {
  const queryClient = useQueryClient();

  const { isPending: isPendingPostLike, mutateAsync: mutatePostLike } =
    useMutation<LikeResponseDTO, Error, LikeDTO>({
      mutationKey: ["like"],
      mutationFn: async (data: LikeDTO) => {
        const response = await api.post<LikeResponseDTO>("/likes", data);
        return response.data;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          return toast.error(error.response?.data.message);
        }
        toast.error("Something went wrong!");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["posts-user"] });
        queryClient.invalidateQueries({ queryKey: ["post-detail"] });
      },
    });

  const handlePostLike = async (data: LikeDTO) => {
    await mutatePostLike(data);
  };

  const { isPending: isPendingPostUnlike, mutateAsync: mutatePostUnlike } =
    useMutation<LikeResponseDTO, Error, UnlikeDTO>({
      mutationKey: ["unlike"],
      mutationFn: async (data: UnlikeDTO) => {
        const response = await api.delete<LikeResponseDTO>(
          `/likes/${data.postId}`
        );
        return response.data;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          return toast.error(error.response?.data.message);
        }
        toast.error("Something went wrong!");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["posts-user"] });
        queryClient.invalidateQueries({ queryKey: ["post-detail"] });
      },
    });

  const handlePostUnlike = async (data: UnlikeDTO) => {
    await mutatePostUnlike(data);
  };

  return {
    isPendingPostLike,
    isPendingPostUnlike,
    handlePostLike,
    handlePostUnlike,
  };
};
