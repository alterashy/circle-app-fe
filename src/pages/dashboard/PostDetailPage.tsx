import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PostDetailCard } from "@/features/home/components/PostDetailCard";
import { PostReplyCard } from "@/features/home/components/PostReplyCard";
import { PostReplyForm } from "@/features/home/components/PostReplyForm";
import type { Post } from "@/features/home/schemas/post.types";
import { api } from "@/lib/api";
import { currentDate } from "@/utils/currentDateTime";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";

export const PostDetailPage = () => {
  const { postId } = useParams({ from: "/(dashboard)/post/$postId" });

  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post-detail", postId],
    queryFn: async () => {
      const response = await api.get(`/posts/${postId}`);
      return response.data.data.post;
    },
  });

  return (
    <div>
      <div className="pt-6 px-4">
        <PostDetailHeader />
      </div>

      {isLoading ? (
        <div className="pt-6 px-4">
          <PostDetailSkeleton />
        </div>
      ) : data ? (
        <>
          <Separator className="my-4" />
          <div className="px-4">
            <PostDetailCard {...data} />
          </div>
          <Separator className="my-4" />
          <div className="px-4">
            <PostReplyForm postId={postId} />
          </div>
          <Separator className="my-4" />
          {data.replies?.length ? (
            <div className="space-y-4">
              {data.replies?.map((reply) => (
                <>
                  <div className="px-4">
                    <PostReplyCard key={reply.id} {...reply} />
                  </div>
                  <Separator className="my-4" />
                </>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              No replies yet.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Post not found.
        </p>
      )}
    </div>
  );
};

const PostDetailHeader = () => {
  const date = currentDate();

  return (
    <div className="flex gap-2 items-center">
      <Link to="/">
        <Button variant="ghost" size="sm">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold">Post</h1>
        <span className="flex gap-2 items-center text-muted-foreground text-xs">
          <CalendarClock size={14} />
          {date} WIB
        </span>
      </div>
    </div>
  );
};

const PostDetailSkeleton = () => (
  <div className="mt-4 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-[300px] w-full rounded-md" />
  </div>
);
