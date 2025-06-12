import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { endPoints } from "@/http-config/endpoints";
import StatusCell from "./components/status-cell";
import PriceCell from "./components/pricing-cell";
import AddEmployee from "./components/add-employee";

import { useTranslation } from "react-i18next";
import GenericClientTable, {
  ConfigType,
  FormConfig,
} from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuthStore } from "@/stores/authStore";
import { RolesConstant } from "@/constants/constants";

export type TProject = {
  id: string;
  name?: string;
  title?: string;
  description: string;
  location: string;
  is_active: true;
  image: string;
  slug: string;
};
function Projects() {
  const { t } = useTranslation();
  const { auth } = useAuthStore();
  const role = auth.account?.user?.role as "client" | "admin" | "employee";
  const columns = [
    {
      type: "text" as const,
      name: "id",
      label: t("ID"),
      data_type: "text" as const,
      isSortingEnabled: false,
    },
    {
      type: "text" as const,
      name: "title",
      label: t("Name"),
      data_type: "text" as const,
    },
    {
      type: "text" as const,
      name: "location",
      label: t("Location"),
      data_type: "text" as const,
    },
    {
      type: "custom" as const,
      name: "quote_price",
      label: t("Quote Price"),
      component: (value: any, rowData: any) => (
        <PriceCell value={value} rowData={rowData} />
      ),
    },
    {
      type: "text" as const,
      name: "description",
      label: t("Description"),
      data_type: "text" as const,
    },
    {
      type: "custom" as const,
      name: "status",
      label: t("Status"),
      component: (value: any, rowData: any) => (
        <StatusCell value={value} rowData={rowData} />
      ),
    },
    ...(role === RolesConstant.ADMIN
      ? [
          {
            type: "custom" as const,
            name: "slug",
            label: "",
            component: (value: any, rowData: any) => (
              <AddEmployee value={value} rowData={rowData} />
            ),
          },
        ]
      : []),
    { type: "actions" as const, name: "" },
  ];

  const layout: ConfigType<TProject> = {
    name: "projects",
    get_endpoint: endPoints.projectEndpoint().pathname + "/get-all-project",
    create_endpoint: endPoints.projectEndpoint().pathname + "/create-project",
    update_endpoint: endPoints.projectEndpoint().pathname + "/update-project",
    delete_endpoint: endPoints.projectEndpoint().pathname + "/delete-project",
    update_key: "slug",
    delete_key: "slug",
    title: t("Projects"),
    layout: "table",
    sortable: true,
    columns,

    actions: [
      { key: "create", label: t("Add new project"), type: "button" },
      { key: "edit", label: t("Edit project"), type: "column" },
      { key: "delete", label: t("Delete project"), type: "column" },
    ],
  };
  const formConfig: FormConfig = {
    name: "project-form",
    title: t("Project"),
    fields: [
      {
        name: "title",
        field_key: "title",
        type: "text",
        data_type: "text",
        label: t("Name"),
        placeholder: t("Project title"),
        editable: true,
        validation: {
          required: t("Name is required"),
          minLength: {
            value: 2,
            message: t("name must be at least 2 characters"),
          },
          maxLength: {
            value: 50,
            message: t("name must be less than 50 characters"),
          },
        },
      },
      {
        name: "description",
        field_key: "description",
        type: "text",
        data_type: "text",
        label: t("Description"),
        placeholder: t("Description"),
        editable: true,
        validation: {
          required: t("Description required"),
        },
      },
      {
        name: "location",
        field_key: "location",
        type: "text",
        data_type: "text",
        label: t("Location"),
        placeholder: t("Location"),
        editable: true,
        validation: {
          required: t("location is required"),
          pattern: {
            message: t("Invalid location"),
          },
        },
      },

      {
        name: "file",
        field_key: "file",
        type: "file",
        label: t("File"),
        editable: true,
        validation: {
          required: t("File is required"),
        },
      },
    ],
  };
  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("Projects List")}
            </h2>
            <p className="text-muted-foreground">
              {t("Manage your Projects here")}.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </>
  );
}

export default Projects;
