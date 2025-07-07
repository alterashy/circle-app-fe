import { ThemeSwitch } from "@/components/ThemeSwitch";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link } from "@tanstack/react-router";

export const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen w-full p-6 relative">
      <div className="absolute right-0 top-0 m-6">
        <ThemeSwitch />
      </div>
      <div className="w-full min-w-[240px] max-w-xs">
        <h1 className="text-primary text-5xl font-bold tracking-tight text-left mb-1">
          Circle
        </h1>
      </div>
      <div className="w-full min-w-[240px] max-w-xs">
        <h2 className="text-xl font-medium text-muted-foreground text-left mb-4">
          Login to Circle
        </h2>
      </div>
      <div className="w-full min-w-[240px] max-w-xs">
        <LoginForm />
      </div>
      <div className="w-full min-w-[240px] max-w-xs">
        <span className="text-xs text-muted-foreground text-left">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:text-primary/70 text-shadow-2xs"
          >
            Create account
          </Link>
        </span>
      </div>
    </div>
  );
};
