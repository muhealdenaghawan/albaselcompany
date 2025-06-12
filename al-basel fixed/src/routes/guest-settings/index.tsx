import SettingsProfile from "@/features/guest-setting/profile";
import { guardsIsNotAdmin } from "@/utils/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guest-settings/")({
  component: SettingsProfile,
  beforeLoad: () => guardsIsNotAdmin(),
});
