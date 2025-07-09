import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Follow } from "../schemas/follow.type";
import type { FollowResponseDTO } from "../schemas/follow.dto";
import { da } from "date-fns/locale";

export const useFollow = () => {
  const currentUser = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: followers, isLoading: isLoadingFollowers } = useQuery<Follow[]>(
    {
      queryKey: ["followers", currentUser?.id],
      queryFn: async () => {
        const response = await api.get(`/follows/followers/${currentUser?.id}`);
        return response.data.data;
      },
      enabled: !!currentUser?.id,
    }
  );

  const { data: followings, isLoading: isLoadingFollowings } = useQuery<
    Follow[]
  >({
    queryKey: ["followings", currentUser?.id],
    queryFn: async () => {
      const response = await api.get(`/follows/followings/${currentUser?.id}`);
      return response.data.data;
    },
    enabled: !!currentUser?.id,
  });

  const follow = useMutation({
    mutationFn: async ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }) => {
      const res = await api.post<FollowResponseDTO>("/follows", {
        followerId,
        followingId,
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Followed successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to follow");
    },
  });

  const unfollow = useMutation({
    mutationFn: async ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }) => {
      const res = await api.delete<FollowResponseDTO>("/follow", {
        data: { followerId, followingId },
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Unfollowed successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to unfollow");
    },
  });

  const toggleFollow = (targetUserId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async () => {
        const res = await api.post("/follows", {
          userId: targetUserId,
        });
        return res.data as { isFollow: boolean };
      },
      onSuccess: (data) => {
        toast.success(data.isFollow ? "Followed" : "Unfollowed");
        queryClient.invalidateQueries();
      },
    });
  };

  return {
    followers,
    isLoadingFollowers,
    followings,
    isLoadingFollowings,
    follow,
    unfollow,
    toggleFollow,
  };
};
