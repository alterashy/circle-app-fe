import { Spinner } from "@/components/ui/spinner";

export const SpinnerLoading = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-xs">
      <Spinner size={"small"} />
      <span>Loading... </span>
    </div>
  );
};
