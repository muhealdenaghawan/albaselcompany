import Projects from "@/features/employee";
import { guardsIsEmployee } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employee/")({
  beforeLoad: () => guardsIsEmployee(),
  component: Projects,
});
