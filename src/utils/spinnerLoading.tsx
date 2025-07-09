import { Spinner } from "@/components/ui/spinner";

type SpinnerLoadingProps = {
  label?: string;
  center?: boolean;
  size?: "small" | "medium" | "large";
};

export const SpinnerLoading = ({
  label = "Loading...",
  center = false,
  size = "medium",
}: SpinnerLoadingProps) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center text-xs ${
        center ? "justify-center h-full" : ""
      }`}
    >
      <Spinner size={size} />
      <span>{label}</span>
    </div>
  );
};
