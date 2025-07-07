import { BottomBar } from "@/components/BottomBar";
import { LeftBar } from "@/components/LeftBar";
import { RightBar } from "@/components/RightBar";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const DashboardLayout = () => {
  const {
    user: { username },
    setUser,
    logout,
  } = useAuthStore();

  const { isFetched } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      try {
        const token = Cookies.get("token");
        const response = await api.post(
          "/auth/check",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
        return response.data;
      } catch (error) {
        console.log(error);
        Cookies.remove("token");
        logout();
      }
    },
  });

  if (isFetched) {
    if (!username) return <Navigate to="/login" />;

    return (
      <div className="h-screen min-w-2xs md:overflow-hidden md:grid md:grid-cols-[auto_1fr_auto] lg:grid-cols-[240px_1fr_360px]">
        <div className="hidden min-h-screen overflow-y-scroll border-r md:block">
          <LeftBar />
        </div>

        <div className="pb-[56px] overflow-y-scroll">
          <Outlet />
        </div>

        <div className="fixed bottom-0 left-0 w-screen md:hidden">
          <BottomBar />
        </div>

        <div className="hidden min-h-screen border-l overflow-y-scroll lg:block">
          <RightBar />
        </div>
      </div>
    );
  }
};
