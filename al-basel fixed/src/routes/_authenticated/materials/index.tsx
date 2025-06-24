import Materials from "@/features/materials";
import guardsIsAdmin from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/materials/")({
  beforeLoad: () => guardsIsAdmin(),
  component: Materials,
});
