import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Follow } from "../schemas/follow.type";

export const useToggleFollow = (targetUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/follows", {
        userId: targetUserId,
      });
      return res.data as { isFollow: boolean };
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useFollowers = (userId: string) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res = await api.get(`/follows/followers/${userId}`);
      return res.data as Follow[];
    },
  });
};

export const useFollowings = (userId: string) => {
  return useQuery({
    queryKey: ["followings", userId],
    queryFn: async () => {
      const res = await api.get(`/follows/followings/${userId}`);
      return res.data as Follow[];
    },
  });
};

export const useFollow = () => {
  const currentUser = useAuthStore((state) => state.user);

  const { data: followers, isPending: isLoadingFollowers } = useQuery<Follow[]>(
    {
      queryKey: ["followers", currentUser?.id],
      queryFn: async () => {
        const res = await api.get(`/follows/followers/${currentUser?.id}`);
        return res.data;
      },
    }
  );

  const { data: followings, isPending: isLoadingFollowings } = useQuery<
    Follow[]
  >({
    queryKey: ["followings", currentUser?.id],
    queryFn: async () => {
      const res = await api.get(`/follows/followings/${currentUser?.id}`);
      return res.data;
    },
  });

  return {
    followers,
    followings,
    isLoadingFollowers,
    isLoadingFollowings,
  };
};
