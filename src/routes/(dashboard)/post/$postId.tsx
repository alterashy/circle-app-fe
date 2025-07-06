import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/post/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/post/$postId"!</div>;
}
