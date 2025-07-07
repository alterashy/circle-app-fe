import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "@tanstack/react-router";
import { CalendarClock, Heart, MessageCircleMore } from "lucide-react";
import { usePostLike } from "../hooks/usePostLike";
import type { Post } from "../schemas/post.types";

export const PostDetailCard = (post: Post) => {
  const navigate = useNavigate();
  const {
    isPendingPostLike,
    isPendingPostUnlike,
    handlePostLike,
    handlePostUnlike,
  } = usePostLike();

  return (
    <div>
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
      <div className="flex flex-col gap-1.5 w-full justify-between">
        <div>
          <p className="text-secondary-foreground mt-2">{post.content}</p>
        </div>
        <div>
          <img
            src={post.images}
            className="w-full md:w-1/2 rounded object-contain"
          />
        </div>
        <div className="flex gap-2 items-center mb-2 text-xs text-muted-foreground">
          <CalendarClock size={"14px"} />
          <span>Posted on {formatDate(post.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            size={"sm"}
            disabled={isPendingPostLike || isPendingPostUnlike}
            onClick={() =>
              post.isLiked
                ? handlePostUnlike({ postId: post.id })
                : handlePostLike({ postId: post.id })
            }
          >
            {post.isLiked ? (
              <Heart color="#E74C3C" fill="#E74C3C" />
            ) : (
              <Heart />
            )}
            <span className="text-sm text-muted-foreground">
              {post.likesCount}
            </span>
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <MessageCircleMore />
            <span className="text-xs text-muted-foreground">
              {post.repliesCount > 1 ? (
                <div>{post.repliesCount} Replies</div>
              ) : (
                <div>{post.repliesCount} Reply</div>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
