import { BottomBar } from "@/components/BottomBar";
import { LeftBar } from "@/components/LeftBar";
import { RightBar } from "@/components/RightBar";
import { Outlet } from "@tanstack/react-router";

export const DashboardLayout = () => {
  return (
    <div className="h-screen min-h-screen min-w-3xs md:overflow-hidden md:grid md:grid-cols-[0.1fr_minmax(0,1fr)_0fr] lg:grid-cols-[240px_1fr_360px]">
      <div className="hidden h-full md:block md:p-6">
        <LeftBar />
      </div>

      <div className="p-4 pb-[56px] overflow-y-scroll md:border-l md:border-r md:border-border md:p-6 lg:border-l lg:border-r lg:border-border">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 w-full md:hidden">
        <BottomBar />
      </div>

      <div className="hidden overflow-y-scroll lg:block lg:p-6">
        <RightBar />
      </div>
    </div>
  );
};
