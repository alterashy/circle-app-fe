import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/features/home/components/PostCard";
import { PostForm } from "@/features/home/components/PostForm";
import { SkeletonPostCard } from "@/features/home/components/SkeletonPostCard";
import { api } from "@/lib/api";
import { currentDate } from "@/utils/currentDateTime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await api.get("/posts", {
    params: { page: pageParam, limit: 10 },
  });
  return res.data.data;
};

export const HomePage = () => {
  const [, setOpen] = useState(false);
  const Date = currentDate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.hasNextPage
          ? lastPage.pagination.page + 1
          : undefined,
      refetchOnWindowFocus: false,
      initialPageParam: 1,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return Array.from({ length: 3 }).map((_, idx) => (
      <SkeletonPostCard key={`skeleton-initial-${idx}`} />
    ));
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">Failed to load posts.</p>
    );
  }

  return (
    <div>
      <div className="flex justify-between pt-6 px-4 items-center w-full">
        <Link to="/">
          <Button variant="ghost" size="sm">
            Home
          </Button>
        </Link>
        <span className="flex gap-2 items-center text-muted-foreground text-xs">
          <CalendarClock size={14} />
          {Date} WIB
        </span>
      </div>

      <Separator className="my-4" />

      {/* Post Form */}
      <div className="px-4">
        <PostForm onCloseDialog={() => setOpen(false)} />
      </div>

      <Separator className="my-4" />

      {/* Posts */}
      {data?.pages.map((page) =>
        page.posts.map((post: any) => (
          <div key={post.id}>
            <PostCard {...post} />
            <Separator className="my-4" />
          </div>
        ))
      )}

      {/* Infinite Scroll Loader */}
      <div ref={observerRef}>
        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, idx) => (
            <SkeletonPostCard key={`skeleton-next-${idx}`} />
          ))}
        {!hasNextPage && (
          <p className="text-center text-muted-foreground text-xs pt-4 pb-8">
            You have reached the end of the posts.
          </p>
        )}
      </div>
    </div>
  );
};
