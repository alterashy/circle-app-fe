import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/password/reset/$token")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/password/reset/$token"!</div>;
}
