import Projects from "@/features/client";
import { guardsIsClient } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/client/")({
  component: Projects,
  beforeLoad: () => guardsIsClient(),
});
