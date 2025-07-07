import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/features/home/components/PostCard";
import { PostForm } from "@/features/home/components/PostForm";
import type { Post } from "@/features/home/schemas/post.types";
import { api } from "@/lib/api";
import { currentDate } from "@/utils/currentDateTime";
import { SpinnerLoading } from "@/utils/spinnerLoading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { useState } from "react";

export const HomePage = () => {
  const [, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const Date = currentDate();

  const {
    data: Post,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: async () => {
      const response = await api.get("/posts", {
        params: { page, limit: 20 },
      });

      return response.data.data.posts;
    },
  });

  return (
    <div>
      <div className="flex justify-between pt-6 pl-4 pr-4 items-center w-full">
        <div>
          <Link to="/">
            <Button variant={"ghost"} size={"sm"}>
              <span>Home</span>
            </Button>
          </Link>
        </div>
        <span className="flex gap-2 items-center text-muted-foreground text-xs">
          <CalendarClock size={"14px"} />
          {Date} WIB
        </span>
      </div>
      <Separator className="my-4" />
      <div className="pl-4 pr-4">
        <PostForm onCloseDialog={() => setOpen(false)} />
      </div>
      <Separator className="my-4" />
      <div>
        <div>
          {isLoading && (
            <p className="text-center text-xs text-muted-foreground">
              <SpinnerLoading />
            </p>
          )}
          {isError && (
            <p className="text-center text-xs text-muted-foreground">
              {error.message}
            </p>
          )}
          {Post?.length === 0 && (
            <p className="text-center text-xs text-muted-foreground">
              Start following people to see their posts.
            </p>
          )}
        </div>
        {Post?.map((post) => (
          <div>
            <div className="felx flex-col pl-4 pr-4">
              <PostCard {...post} key={post.id} />
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
