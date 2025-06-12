import SettingsAppearance from "@/features/guest-setting/appearance";
import { guardsIsNotAdmin } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guest-settings/appearance")({
  component: SettingsAppearance,
  beforeLoad: () => guardsIsNotAdmin(),
});
