// features/follow/hooks/useFollowSuggestions.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type SuggestedUser = {
  id: string;
  username: string;
  profile: {
    fullName: string;
    avatarUrl: string | null;
  };
  followersCount: number;
  mutualCount: number;
};

export const useFollowSuggestions = () => {
  const { data, isLoading } = useQuery<{ users: SuggestedUser[] }>({
    queryKey: ["suggested-users"],
    queryFn: async () => {
      const res = await api.get("/users/suggest");
      return res.data.data;
    },
  });

  return {
    suggestions: data?.users ?? [],
    isLoadingSuggestions: isLoading,
  };
};
