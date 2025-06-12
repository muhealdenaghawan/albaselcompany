import Services from "@/features/services";
import guardsIsAdmin from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/services/")({
  component: Services,
  beforeLoad: () => guardsIsAdmin(),
});
