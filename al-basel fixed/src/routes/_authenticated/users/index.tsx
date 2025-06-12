import { createFileRoute } from "@tanstack/react-router";
import Users from "@/features/users";
import guardsIsAdmin from "@/utils/guards";

export const Route = createFileRoute("/_authenticated/users/")({
  component: Users,
  beforeLoad: () => guardsIsAdmin(),
});
