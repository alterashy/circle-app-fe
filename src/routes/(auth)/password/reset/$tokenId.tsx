import { PasswordResetPage } from "@/pages/auth/PasswordResetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/password/reset/$tokenId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PasswordResetPage />
    </div>
  );
}
