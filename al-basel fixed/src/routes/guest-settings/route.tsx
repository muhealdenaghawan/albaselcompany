import Settings from "@/features/guest-setting";
import { guardsIsNotAdmin } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guest-settings")({
  component: Settings,
  beforeLoad: () => guardsIsNotAdmin(),
});
