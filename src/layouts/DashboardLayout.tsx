import { BottomBar } from "@/components/BottomBar";
import { LeftBar } from "@/components/LeftBar";
import { RightBar } from "@/components/RightBar";
import { Outlet } from "@tanstack/react-router";

export const DashboardLayout = () => {
  return (
    <div className="h-screen min-w-2xs md:overflow-hidden md:grid md:grid-cols-[auto_1fr_auto] lg:grid-cols-[240px_1fr_360px]">
      <div className="hidden min-h-screen overflow-y-scroll border-r md:block">
        <LeftBar />
      </div>

      <div className="pb-[56px] p-6 overflow-y-scroll">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 w-screen md:hidden">
        <BottomBar />
      </div>

      <div className="hidden min-h-screen border-l p-6 overflow-y-scroll lg:block">
        <RightBar />
      </div>
    </div>
  );
};
