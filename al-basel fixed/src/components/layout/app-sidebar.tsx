import { NavGroup } from "@/components/layout/nav-group";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import Header from "./data/header";
import { sidebarData } from "./data/sidebar-data";
import { useRTL } from "@/hooks/use-rtl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const isRTL = useRTL();
  return (
    <Sidebar collapsible="icon" variant="floating" side={isRTL?"right":"left"} {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
