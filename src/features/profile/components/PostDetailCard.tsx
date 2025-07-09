import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Post } from "@/dtos/post.dto";
import { usePostLike } from "@/features/home/hooks/usePostLike";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "@tanstack/react-router";
import { CalendarClock, Heart, MessageCircleMore } from "lucide-react";

export const PostDetailCardSimple = (post: Post) => {
  const navigate = useNavigate();
  const {
    isPendingPostLike,
    isPendingPostUnlike,
    handlePostLike,
    handlePostUnlike,
  } = usePostLike();

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* User Info */}
      <div className="flex gap-4 items-center w-full">
        <Avatar
          onClick={() => navigate({ to: `/profile/${post.user?.username}` })}
          className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer"
        >
          <AvatarImage
            src={
              post.user?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${post.user?.profile?.fullName}`
            }
            alt="user-avatar"
          />
        </Avatar>
        <div
          className="flex flex-col justify-center cursor-pointer hover:text-primary"
          onClick={() => navigate({ to: `/profile/${post.user?.username}` })}
        >
          <span className="text-sm font-semibold">
            {post.user?.profile?.fullName}
          </span>
          <span className="text-sm text-muted-foreground">
            @{post.user?.username}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-secondary-foreground">{post.content}</p>

      {/* Date */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarClock size={14} />
        <span>Posted on {formatDate(post.createdAt)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={isPendingPostLike || isPendingPostUnlike}
          onClick={() =>
            post.isLiked
              ? handlePostUnlike({ postId: post.id })
              : handlePostLike({ postId: post.id })
          }
        >
          {post.isLiked ? <Heart color="#E74C3C" fill="#E74C3C" /> : <Heart />}
          <span className="text-sm text-muted-foreground">
            {post.likesCount}
          </span>
        </Button>
      </div>
    </div>
  );
};
