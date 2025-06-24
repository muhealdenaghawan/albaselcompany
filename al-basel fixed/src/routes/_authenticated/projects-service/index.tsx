import ProjectsService from "@/features/services/project-services";
import { guardsIsAdminOrEmployee } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projects-service/")({
  component: ProjectsService,
  beforeLoad: () => guardsIsAdminOrEmployee(),
});
