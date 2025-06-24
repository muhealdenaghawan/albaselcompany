import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";

function SettingButton() {
  return (
    <Link to={"/guest-settings"}>
      <Settings />
    </Link>
  );
}

export default SettingButton;
