import {
  IconAutomation,
  IconBrandMyOppo,
  IconPalette,
  IconServer,
  IconSettings,
  IconUserCog,
  IconUsers,
  IconWood,
} from "@tabler/icons-react";
import { type SidebarData } from "../types";
import { RolesConstant } from "@/constants/constants";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "",
    avatar: "/logo.png",
  },

  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Users",
          url: "/users",
          icon: IconUsers,
          role: [RolesConstant.ADMIN],
        },

        {
          title: "Services",
          url: "/services",
          icon: IconBrandMyOppo,
          role: [RolesConstant.ADMIN],
        },
        {
          title: "Materials",
          url: "/materials",
          icon: IconWood,
          role: [RolesConstant.ADMIN],
        },
        {
          title: "Projects",
          url: "/projects",
          icon: IconAutomation,
          role: [
            RolesConstant.ADMIN,
            RolesConstant.CLIENT,
            RolesConstant.employee,
          ],
        },
        {
          title: "Projects Service",
          url: "/projects-service",
          icon: IconServer,
          role: [
            RolesConstant.ADMIN,
            RolesConstant.CLIENT,
            RolesConstant.employee,
          ],
        },
      ],
    },

    {
      title: "",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: IconUserCog,
            },

            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: IconPalette,
            },
          ],
        },
      ],
    },
  ],
};
