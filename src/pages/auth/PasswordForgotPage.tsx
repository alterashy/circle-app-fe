import { ThemeSwitch } from "@/components/ThemeSwitch";
import { PasswordForgotForm } from "@/features/auth/components/PasswordForgotForm";
import { Link } from "@tanstack/react-router";

export const PasswordForgotPage = () => {
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
        <PasswordForgotForm />
      </div>
      <div className="w-full min-w-[240px] max-w-xs">
        <span className="text-xs text-muted-foreground text-left">
          Back to Login?{" "}
          <Link
            to="/"
            className="text-primary font-semibold hover:text-primary-foreground"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};
