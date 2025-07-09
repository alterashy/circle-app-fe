import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type {
  LikeReplyDTO,
  LikeReplyResponseDTO,
} from "../schemas/reply.like.dto";

export const useReplyLike = () => {
  const queryClient = useQueryClient();

  const { isPending: isPendingReplyLike, mutateAsync: mutateReplyLike } =
    useMutation<LikeReplyResponseDTO, Error, LikeReplyDTO>({
      mutationKey: ["like"],
      mutationFn: async (data: LikeReplyDTO) => {
        const response = await api.post<LikeReplyResponseDTO>(
          "/likes/reply",
          data
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

  const handleReplyLike = async (data: LikeReplyDTO) => {
    await mutateReplyLike(data);
  };

  const { isPending: isPendingReplyUnlike, mutateAsync: mutateReplyUnlike } =
    useMutation<LikeReplyResponseDTO, Error, LikeReplyDTO>({
      mutationKey: ["unlike"],
      mutationFn: async (data: LikeReplyDTO) => {
        const response = await api.delete<LikeReplyResponseDTO>(
          `/likes/reply/${data.replyId}`
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

  const handleReplyUnlike = async (data: LikeReplyDTO) => {
    await mutateReplyUnlike(data);
  };

  return {
    isPendingReplyLike,
    isPendingReplyUnlike,
    handleReplyLike,
    handleReplyUnlike,
  };
};
