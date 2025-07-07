import { api } from "@/lib/api";
import type { DeletePostSchemaDTO } from "@/schemas/post.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { PostResponseDTO } from "../schemas/post.dto";

export const usePostDelete = () => {
  const queryClient = useQueryClient();

  const { isPending: isPendingPostDelete, mutateAsync: mutatePostDelete } =
    useMutation<PostResponseDTO, Error, DeletePostSchemaDTO>({
      mutationKey: ["post-delete"],
      mutationFn: async (data: DeletePostSchemaDTO) => {
        const response = await api.delete<PostResponseDTO>(
          `/posts/${data.postId}`
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
        await queryClient.invalidateQueries({
          queryKey: ["posts-user"],
        });
        toast.success("Post deleted");
      },
    });

  const handlePostDelete = async (data: DeletePostSchemaDTO) => {
    await mutatePostDelete(data);
  };

  return { isPendingPostDelete, handlePostDelete };
};
