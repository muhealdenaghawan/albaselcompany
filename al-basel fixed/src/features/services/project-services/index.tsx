import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import MaterialsField from "./components/materials-field";
import CostCell from "./CostCell";
import ServicesPopup from "./services-popup";
import GenericClientTable, { ConfigType, FormConfig } from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import { TProject } from "@/features/employee";

export type TProjectsService = {
  id: number;
  title: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    role: string;
    created_at: string; // consider Date if you'll parse it
  };
  client: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    role: string;
    created_at: string;
  };
  description: string;
  location: string;
  status: string;
  quote_price: string; // or number if you convert it
  slug: string;
  services: {
    id: number;
    name: string;
    description: string;
    price: string; // or number
    slug: string;
    materials: {
      id: number;
      name: string;
      quantity_used: number;
      price: string; // or number
    }[];
  }[];
};

function ProjectsService() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError } = useQuery({
    queryKey: ["get-projects"],
    queryFn: async () => {
      const response = await authAxios.get(endPoints.projectEndpoint().pathname + "/get-all-project");
      return response.data;
    },
  });

  const { data: servicesData, isError: isErrorGetServcies } = useQuery({
    queryKey: ["get-services"],
    queryFn: async () => {
      const response = await authAxios.get(endPoints.servicesEndpoint().pathname + "/get-all-service");
      return response.data;
    },
  });
  console.log("🚀 ~ ProjectsService ~ servicesData:", servicesData);

  const optionDataForProjects = data?.data?.data?.map((proj: TProject) => ({ label: proj.title, value: proj.id }));
  const optionDataForServices = servicesData?.data?.data?.map((proj: TProject) => ({
    label: proj.name,
    value: proj.id,
  }));

  const layout: ConfigType<TProjectsService> = {
    name: "projects-service",
    get_endpoint: "/project-service/get-all-project-service",
    create_endpoint: "/project-service/create-project-service",
    update_endpoint: "",
    delete_endpoint: "",
    update_key: "slug",
    delete_key: "slug",
    custom_key: "slug",
    title: t("Projects Service"),
    layout: "table",
    sortable: true,
    columns: [
      { type: "text", name: "id", label: t("ID"), data_type: "text", isSortingEnabled: false },
      { type: "text", name: "title", label: t("Project Name"), data_type: "text" },
      { type: "text", name: "user.first_name", label: t("Supervisor Name"), data_type: "text" },
      { type: "text", name: "user.email", label: t("Supervisor Email"), data_type: "text" },
      { type: "text", name: "client.first_name", label: t("Client Name"), data_type: "text" },
      { type: "text", name: "client.email", label: t("Client Email"), data_type: "text" },
      {
        type: "custom",
        name: "services",
        label: t("services"),
        component: (value) => {
          return <ServicesPopup services={value} />;
        },
      },
      {
        type: "text",
        name: "description",
        label: t("Description"),
        data_type: "text",
      },
      { type: "text", name: "location", label: t("Location"), data_type: "text" },
      { type: "text", name: "quote_price", label: t("Quote Price"), data_type: "text" },
      {
        type: "custom",
        name: "cost",
        label: t("Cost"),
        component: (value: any, rowData: any) => <CostCell value={value} rowData={rowData} />,
      },
      { type: "text", name: "status", label: t("Status"), data_type: "text" },
    ],

    actions: [
      //   { key: "create", label: t("Add new project"), type: "button" },
    ],
  };
  const formConfig: FormConfig = {
    typeHeader: "JSON",
    name: "project-service-form",
    title: t("Project Service"),
    fields: [
      {
        name: "project_id",
        field_key: "title",
        type: "select",
        data: optionDataForProjects,
        data_type: "text",
        label: t("Project"),
        placeholder: t("Project title"),
        editable: true,
        // validation: {
        //   required: t("Name is required"),
        // },
      },
      {
        name: "service_id",
        field_key: "service_id",
        type: "select",
        data_type: "text",
        data: optionDataForServices,
        label: t("Services"),
        placeholder: t("Services"),
        editable: true,
        // validation: {
        //   required: t("Description required"),
        // },
      },
      {
        name: "materials",
        field_key: "materials",
        type: "custom",
        component: <MaterialsField />,
        data_type: "text",
        label: t("Location"),
        placeholder: t("Location"),
        editable: true,
        // validation: {
        //   required: t("location is required"),
        //   pattern: {
        //     message: t("Invalid location"),
        //   },
        // },
      },
    ],
    dataBeforeSend: (data: any) => {
      // Convert string numbers to actual numbers
      data.service_id = String(data.service_id);
      data.project_id = String(data.project_id);

      data.materials = data.materials.map((material: any) => ({
        ...material,
        quantity_used: Number(material.quantity_used),
        price: Number(material.price),
        // material_id: Number(material.s),
      }));

      return data;
    },
  };
  if (isError || isErrorGetServcies) navigate({ to: "/500" });
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
            <h2 className="text-2xl font-bold tracking-tight">{t("Projects Service List")}</h2>
            <p className="text-muted-foreground">{t("Manage your Projects Service here")}.</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </>
  );
}

export default ProjectsService;
