import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function ProfileDropdown() {
  const { auth } = useAuthStore();
  console.log("🚀 ~ ProfileDropdown ~ auth:", auth);
  const navigate = useNavigate();
  const user = auth?.account?.user;
  console.log("🚀 ~ ProfileDropdown ~ user:", user);
  // ====================== Log out  ======================
  const onLogout = () => {
    auth.reset();
    navigate({ to: "/sign-in" });
  };
  const { t } = useTranslation();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{`${user?.first_name?.[0]}${user?.last_name?.[0]}`?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={onLogout}>
          {t("Log out")}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
