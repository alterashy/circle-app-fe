import { Navigate, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";

const AuthLayout = () => {
  const token = Cookies.get("token");

  if (token) return <Navigate to="/" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
