import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog-custom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post } from "@/dtos/post.dto";
import { PostCard } from "@/features/home/components/PostCard";
import { PostReplyCard } from "@/features/home/components/PostReplyCard";
import { PostReplyForm } from "@/features/home/components/PostReplyForm";
import { PostDetailCardSimple } from "@/features/profile/components/PostDetailCard";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { SpinnerLoading } from "@/utils/spinnerLoading";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export const ProfilePage = () => {
  const { username } = useParams({ from: "/(dashboard)/profile/$username" });
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [mediaIndex, setMediaIndex] = useState<number | null>(null);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await api.get(`/users/profile/${username}`);
      return res.data.data.user;
    },
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts-user", username],
    queryFn: async () => {
      const response = await api.get(`/posts/username/${username}`);
      return response.data.data.posts;
    },
    enabled: !!currentUser?.id,
  });

  const mediaPosts = posts?.filter((post) => !!post.images) || [];

  const { data: mediaPostDetail, isLoading: isLoadingMediaPostDetail } =
    useQuery<Post>({
      queryKey: ["post-detail"],
      queryFn: async () => {
        const res = await api.get(`/posts/${mediaPosts[mediaIndex!]?.id}`);
        return res.data.data.post;
      },
      enabled: mediaIndex !== null,
    });

  return (
    <div className="pt-6 px-4">
      <div className="flex items-center justify-between pb-4 relative">
        <span className="font-semibold">My Profile</span>
        <ThemeSwitch />
      </div>

      {isLoading && "Loading user data...s"}
      {isError ||
        (!userData && (
          <p className="text-center text-xs text-muted-foreground">
            Profile not found.
          </p>
        ))}

      <ProfileHeader {...userData} />

      <Tabs defaultValue="post" className="w-full my-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="post">All Post</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <Separator className="my-2" />

        <TabsContent value="post">
          {isLoadingPosts && <p>Loading...</p>}
          {isErrorPosts && <p>{error?.message}</p>}
          {posts?.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">
              It's a bit quiet here, start by creating a post.
            </div>
          )}
          <div className="flex flex-col">
            {posts?.map((post) => (
              <div key={post.id}>
                <PostCard {...post} />
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media">
          {isLoadingPosts && (
            <p className="text-center text-sm text-muted-foreground">
              Loading...
            </p>
          )}
          {isErrorPosts && (
            <p className="text-center text-sm text-muted-foreground">
              {error?.message}
            </p>
          )}
          {mediaPosts.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              You haven't uploaded any media yet.
            </p>
          )}

          <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {mediaPosts.map((post, idx) => (
              <img
                key={post.id}
                src={post.images}
                alt={post.id}
                onClick={() => setMediaIndex(idx)}
                className="aspect-square object-cover border-2 border-border p-1 bg-background cursor-pointer hover:rounded-lg hover:transform hover:scale-110 duration-175 ease-in-out"
              />
            ))}
          </div>

          {mediaIndex !== null && (
            <Dialog open={true} onOpenChange={() => setMediaIndex(null)}>
              <DialogContent className="w-[90vw] max-w-5xl h-[90vh] p-0 overflow-hidden">
                {isLoadingMediaPostDetail || !mediaPostDetail ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <SpinnerLoading />
                  </div>
                ) : (
                  <>
                    <DialogTitle className="mb-4">Media Post</DialogTitle>
                    <DialogDescription className="hidden" />
                    <div className="flex h-full lg:flex-row">
                      <div className="relative w-3/5 h-full bg-card hidden lg:flex items-center justify-center">
                        <img
                          src={mediaPostDetail.images}
                          alt={mediaPostDetail.id}
                          className="max-h-full max-w-full object-contain"
                        />
                        {mediaIndex > 0 && (
                          <Button
                            onClick={() => setMediaIndex(mediaIndex - 1)}
                            variant="secondary"
                            size="icon"
                            className="absolute left-3 top-1/2 rounded-full"
                          >
                            <ChevronLeft />
                          </Button>
                        )}
                        {mediaIndex < mediaPosts.length - 1 && (
                          <Button
                            onClick={() => setMediaIndex(mediaIndex + 1)}
                            variant="secondary"
                            size="icon"
                            className="absolute right-3 top-1/2 rounded-full"
                          >
                            <ChevronRight />
                          </Button>
                        )}
                      </div>

                      <div className="w-full h-full flex flex-col lg:w-2/5">
                        <div className="flex justify-between items-center p-4">
                          <div className="flex gap-4 items-center w-full">
                            <Avatar
                              onClick={() =>
                                navigate({
                                  to: `/profile/${mediaPostDetail.user?.username}`,
                                })
                              }
                              className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
                            >
                              <AvatarImage
                                src={
                                  mediaPostDetail.user?.profile?.avatarUrl ||
                                  `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${mediaPostDetail.user?.profile?.fullName}`
                                }
                                alt="user-avatar"
                              />
                            </Avatar>
                            <div
                              className="flex flex-col justify-center cursor-pointer hover:text-primary"
                              onClick={() =>
                                navigate({
                                  to: `/profile/${mediaPostDetail.user?.username}`,
                                })
                              }
                            >
                              <span className="text-sm font-semibold">
                                {mediaPostDetail.user?.profile?.fullName}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                @{mediaPostDetail.user?.username}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMediaIndex(null)}
                          >
                            <X />
                          </Button>
                        </div>

                        <Separator />

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          <PostDetailCardSimple {...mediaPostDetail} />
                          <Separator className="my-4" />
                          {mediaPostDetail.replies?.map((reply) => (
                            <div key={reply.id}>
                              <PostReplyCard {...reply} />
                              <Separator className="my-4" />
                            </div>
                          ))}
                        </div>

                        <div className="p-4 border-t">
                          <PostReplyForm postId={mediaPostDetail.id} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
