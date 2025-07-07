import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth.store";
import { allowEdit } from "@/utils/allowEdit";
import TimeAgo from "@/utils/timeAgo";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit3,
  Ellipsis,
  Heart,
  ImagePlus,
  MessageCircleMore,
  Trash2,
  XSquareIcon,
} from "lucide-react";
import { useState } from "react";
import { usePostDelete } from "../hooks/usePostDelete";
import { usePostLike } from "../hooks/usePostLike";
import { usePostUpdate } from "../hooks/usePostUpdate";
import type { Post } from "../schemas/post.types";

export const PostCard = (post: Post) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = post.user?.id === currentUser?.id;

  const navigate = useNavigate();

  const onClickPost = () => navigate({ to: `/post/${post.id}` });

  const [editedPost, setEditedPost] = useState(post);

  const {
    isPendingPostLike,
    isPendingPostUnlike,
    handlePostLike,
    handlePostUnlike,
  } = usePostLike();

  const {
    register,
    handleSubmit,
    onSubmitPost,
    errors,
    inputRef,
    isEditing,
    previewURL,
    isPendingPostUpdate,
    setIsEditing,
    setPreviewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    registerImageRef,
    registerImageOnChange,
    ...restRegisterImage
  } = usePostUpdate(post.id);

  const { isPendingPostDelete, handlePostDelete } = usePostDelete();

  return (
    <div>
      <div className="flex gap-4">
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
        <div className="flex flex-col gap-1.5 w-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <span className="text-sm font-semibold">
                {post.user?.profile?.fullName}
              </span>
              <span className="text-sm text-muted-foreground hidden md:block">
                @{post.user?.username}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                <TimeAgo date={post.createdAt} />
              </span>
              <span className="text-xs text-muted-foreground">
                {post.isEdited && <span>(edited)</span>}
              </span>
            </div>
            <div>
              {isOwner && isEditing === false && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-fit ml-2 mr-2">
                    {allowEdit(post.createdAt) && (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditing(true);
                          setPreviewURL(post.images || null);
                          handleFileChange;
                        }}
                        className="text-xs text-secondary-foreground cursor-pointer"
                      >
                        <Edit3 className="text-xs text-secondary-foreground" />
                        <span className="text-xs font-semibold">Edit</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button" variant={"ghost"} size={"sm"}>
                            <Trash2 className="text-xs text-secondary-foreground" />
                            <span className="text-xs text-secondary-foreground">
                              Delete
                            </span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your Post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              type="button"
                              className="text-xs"
                            >
                              <span>Cancel</span>
                            </AlertDialogCancel>
                            <AlertDialogAction
                              type="submit"
                              onClick={() =>
                                handlePostDelete({ postId: post.id })
                              }
                              disabled={isPendingPostDelete}
                              className="text-xs"
                            >
                              <Trash2 />
                              <span>Delete</span>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmitPost)}>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex flex-row gap-4">
                    <Textarea
                      {...register("content")}
                      value={editedPost.content}
                      onChange={(e) =>
                        setEditedPost((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    />
                    <Input
                      {...restRegisterImage}
                      className="hidden"
                      id="picture"
                      type="file"
                      accept="image/*"
                      ref={(e) => {
                        registerImageRef(e);
                        inputRef.current = e;
                      }}
                      onChange={(e) => {
                        registerImageOnChange(e);
                        handleFileChange(e);
                      }}
                    />
                  </div>
                  <div>
                    {previewURL && (
                      <div className="relative inline-block">
                        <Separator className="my-4" />
                        <img
                          src={previewURL}
                          alt="image preview"
                          className="w-full object-contain rounded border md:w-1/2 md:h-1/2"
                        />
                        <Button
                          onClick={() => {
                            handleRemoveFile();
                            setPreviewURL(null);
                          }}
                          variant={"destructive"}
                          size={"icon"}
                          className="absolute top-10 left-2"
                        >
                          <XSquareIcon />
                        </Button>
                      </div>
                    )}
                    <Separator className="my-4" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handleInputFile}
                    type="button"
                    size={"sm"}
                    variant={"outline"}
                    className="text-xs"
                  >
                    <ImagePlus className="text-primary" />
                    {previewURL ? (
                      <span className="text-xs hidden md:block">
                        Change Image
                      </span>
                    ) : (
                      <span className="text-xs hidden md:block">Add Image</span>
                    )}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant={"default"}
                      size="sm"
                      type="submit"
                      className="text-xs"
                      disabled={isPendingPostUpdate}
                    >
                      {isPendingPostUpdate ? <Spinner /> : "Update"}
                    </Button>
                    <Button
                      size="sm"
                      variant={"destructive"}
                      onClick={() => {
                        setIsEditing(false);
                        setPreviewURL(null);
                        handleRemoveFile();
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div onClick={onClickPost} className="cursor-pointer">
                  <p className="text-secondary-foreground text-pretty hover:text-muted-foreground break-words">
                    {post.content}
                  </p>
                </div>
                <div>
                  <img
                    src={post.images}
                    className="w-full md:w-1/2 rounded object-contain"
                  />
                </div>
              </div>
            )}
          </form>
          <div className="flex justify-between">
            {isEditing === false && (
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
                <Button variant={"ghost"} size={"sm"} onClick={onClickPost}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
