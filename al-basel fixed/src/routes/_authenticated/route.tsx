import Cookies from "js-cookie";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/skip-to-main";
import isAuthenticated from "@/http-config/isAuthenticated";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!isAuthenticated())
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
  },
});

function RouteComponent() {
  const defaultOpen = Cookies.get("sidebar_state") !== "false";
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ms-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "sm:transition-[width] sm:duration-200 sm:ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
