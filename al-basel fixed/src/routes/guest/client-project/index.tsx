import ClientProject from "@/features/client-project";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guest/client-project/")({
  component: ClientProject,
});
