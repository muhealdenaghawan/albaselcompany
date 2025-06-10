import Projects from "@/features/projects";
import { guardsIsAdminOrEmployee } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projects/")({
  beforeLoad: () => guardsIsAdminOrEmployee(),
  component: Projects,
});
