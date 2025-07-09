import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const SkeletonPostCard = () => {
  return (
    <div className="flex gap-4 w-full px-4 py-6">
      {/* Avatar */}
      <Skeleton className="h-10 w-10 rounded-full" />

      <div className="flex flex-col gap-2 w-full">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* Image (optional placeholder) */}
        <Skeleton className="w-full md:w-1/2 h-[180px] rounded object-contain" />

        {/* Footer (actions) */}
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>

        <Separator className="my-4" />
      </div>
    </div>
  );
};
