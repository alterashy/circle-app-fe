import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFollowCount = (userId: string) => {
  return useQuery({
    queryKey: ["follow-count", userId],
    queryFn: async () => {
      const res = await api.get(`/follows/count/${userId}`);
      return res.data as { followersCount: number; followingsCount: number };
    },
  });
};
