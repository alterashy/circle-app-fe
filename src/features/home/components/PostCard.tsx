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
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = post.user?.id === currentUser?.id;
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

  const onClickPost = () => navigate({ to: `/post/${post.id}` });

  const renderDropdownMenu = () =>
    isOwner && !isEditing ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {allowEdit(post.createdAt) && (
            <DropdownMenuItem
              onClick={() => {
                setIsEditing(true);
                setPreviewURL(post.images || null);
                handleFileChange;
              }}
              className="text-xs text-secondary-foreground cursor-pointer p-2 "
            >
              <Edit3 className="text-xs text-secondary-foreground" />
              <span className="text-xs font-semibold">Edit</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                  className="w-full"
                >
                  <Trash2 className="text-xs text-secondary-foreground" />
                  <span className="text-xs text-secondary-foreground">
                    Delete
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your Post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel type="button" className="text-xs">
                    <span>Cancel</span>
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    onClick={() => handlePostDelete({ postId: post.id })}
                    disabled={isPendingPostDelete}
                    className="text-xs text-secondary"
                  >
                    {isPendingPostDelete ? <Spinner /> : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;

  const renderEditForm = () => (
    <form onSubmit={handleSubmit(onSubmitPost)}>
      <div className="flex flex-col gap-2">
        <Textarea
          {...register("content")}
          value={editedPost.content}
          onChange={(e) =>
            setEditedPost((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <Input
          {...restRegisterImage}
          id="picture"
          type="file"
          accept="image/*"
          className="hidden"
          ref={(e) => {
            registerImageRef(e);
            inputRef.current = e;
          }}
          onChange={(e) => {
            registerImageOnChange(e);
            handleFileChange(e);
          }}
        />
        {previewURL && (
          <div className="relative">
            <Separator className="my-4" />
            <img
              src={previewURL}
              alt="Preview"
              className="w-full md:w-1/2 rounded border object-contain"
            />
            <Button
              type="button"
              onClick={() => {
                handleRemoveFile();
                setPreviewURL(null);
              }}
              variant="destructive"
              size="icon"
              className="absolute top-2 left-2"
            >
              <XSquareIcon />
            </Button>
          </div>
        )}
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <Button
            onClick={handleInputFile}
            type="button"
            size="sm"
            variant="outline"
          >
            <ImagePlus className="mr-1" />
            {previewURL ? "Change Image" : "Add Image"}
          </Button>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isPendingPostUpdate}>
              {isPendingPostUpdate ? <Spinner /> : "Update"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                setIsEditing(false);
                setPreviewURL(null);
                handleRemoveFile();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );

  const renderPostContent = () => (
    <div className="flex flex-col gap-2">
      <div onClick={onClickPost} className="cursor-pointer">
        <p className="text-sm text-muted-foreground hover:text-foreground break-words">
          {post.content}
        </p>
      </div>
      {post.images && (
        <img
          src={post.images}
          className="w-full md:w-1/2 rounded object-contain"
        />
      )}
    </div>
  );

  const renderActionButtons = () =>
    !isEditing && (
      <div className="flex gap-2 mt-2">
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
          <span className="ml-1 text-sm">{post.likesCount}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onClickPost}>
          <MessageCircleMore />
          <span className="ml-1 text-sm">
            {post.repliesCount} {post.repliesCount === 1 ? "Reply" : "Replies"}
          </span>
        </Button>
      </div>
    );

  return (
    <div className="flex gap-4 pl-4 pr-4 w-full overflow-y-scroll">
      <Avatar
        onClick={() => navigate({ to: `/profile/${post.user?.username}` })}
        className="cursor-pointer hover:ring"
      >
        <AvatarImage
          src={
            post.user?.profile?.avatarUrl ||
            `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${post.user?.profile?.fullName}`
          }
          alt="User Avatar"
        />
      </Avatar>

      <div className="flex flex-col gap-2 pr-3 w-full">
        {/* Header: fullName, username, date, edited + dropdown */}
        <div className="grid grid-cols-[1fr_auto] items-start">
          <div className="flex flex-wrap gap-1 items-center">
            <span className="font-semibold text-sm">
              {post.user?.profile?.fullName}
            </span>
            <span className="text-sm text-muted-foreground hidden md:block">
              @{post.user?.username}
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              <TimeAgo date={post.createdAt} />
            </span>
            {post.isEdited && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>

          {/* Reserve space even when dropdown is not shown */}
          <div className="h-6 w-6">{renderDropdownMenu()}</div>
        </div>

        {isEditing ? renderEditForm() : renderPostContent()}
        {renderActionButtons()}
      </div>
    </div>
  );
};
