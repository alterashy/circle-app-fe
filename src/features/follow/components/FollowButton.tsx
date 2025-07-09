import { useToggleFollow } from "../hooks/useFollowToggle";

interface FollowButtonProps {
  userId: string;
  isFollow: boolean;
}

export const FollowButton = ({ userId, isFollow }: FollowButtonProps) => {
  const { mutate, isPending } = useToggleFollow(userId);

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className={`px-4 py-1 rounded font-semibold ${
        isFollow ? "bg-red-500 text-white" : "bg-white text-black border"
      }`}
    >
      {isPending ? "..." : isFollow ? "Unfollow" : "Follow"}
    </button>
  );
};
