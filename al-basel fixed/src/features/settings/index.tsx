import { LanguageSwitcher } from "@/components/language-switcher";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";
import { IconPalette, IconUser } from "@tabler/icons-react";
import { Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SidebarNav from "./components/sidebar-nav";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <div
      style={{
        direction: isEn ? "ltr" : "rtl",
        marginRight: "0",
      }}
    >
      {/* ===== Top Heading ===== */}
      {/* <Header> */}
      {/* <Search /> */}
      <div className="ml-auto flex items-center space-x-4  mt-3 mx-1">
        
        <ThemeSwitch />
        <ProfileDropdown />
        <LanguageSwitcher />
      </div>
      {/* </Header> */}

      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.description")}</p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1">
            <Outlet />
          </div>
        </div>
      </Main>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "sidebar.profile",
    icon: <IconUser size={18} />,
    href: "/settings",
  },
  {
    title: "sidebar.appearance",
    icon: <IconPalette size={18} />,
    href: "/settings/appearance",
  },
];
