import { PasswordForgotPage } from "@/pages/auth/PasswordForgotPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/password/forgot")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PasswordForgotPage />
    </div>
  );
}
