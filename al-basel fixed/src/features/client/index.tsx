// import GenericClientTable, { ConfigType, FormConfig } from "@/components/GenericClientTable";
// import { LanguageSwitcher } from "@/components/language-switcher";
// import { Main } from "@/components/layout/main";
// import { ProfileDropdown } from "@/components/profile-dropdown";
// import SettingButton from "@/components/setting";
// import { ThemeSwitch } from "@/components/theme-switch";
// import { endPoints } from "@/http-config/endpoints";
// import { Link } from "@tanstack/react-router";

// import { useTranslation } from "react-i18next";

// export type TProject = {
//   id: string;
//   name?: string;
//   title?: string;
//   description: string;
//   location: string;
//   is_active: true;
//   image: string;
//   slug: string;
// };
// function Projects() {
//   const { t } = useTranslation();
//   const layout: ConfigType<TProject> = {
//     name: "projects",
//     get_endpoint: endPoints.projectEndpoint().pathname + "/get-all-project",
//     create_endpoint: endPoints.projectEndpoint().pathname + "/create-project",
//     update_endpoint: endPoints.projectEndpoint().pathname + "/update-project",
//     delete_endpoint: endPoints.projectEndpoint().pathname + "/delete-project",
//     update_key: "slug",
//     delete_key: "slug",
//     title: t("Projects"),
//     layout: "table",
//     sortable: true,
//     columns: [
//       { type: "text", name: "id", label: t("ID"), data_type: "text", isSortingEnabled: false },
//       { type: "text", name: "title", label: t("Name"), data_type: "text" },
//       { type: "text", name: "location", label: t("Location"), data_type: "text" },

//       {
//         type: "text",
//         name: "quote_price",
//         label: t("Quote Price"),
//         data_type: "text",
//       },
//       {
//         type: "text",
//         name: "description",
//         label: t("Description"),
//         data_type: "text",
//       },
//       {
//         type: "text",
//         name: "status",
//         label: t("Status"),
//         data_type: "text",
//       },
//     ],

//     actions: [{ key: "create", label: t("Add new project"), type: "button" }],
//   };
//   const formConfig: FormConfig = {
//     name: "project-form",
//     title: t("Project"),
//     fields: [
//       {
//         name: "title",
//         field_key: "title",
//         type: "text",
//         data_type: "text",
//         label: t("Name"),
//         placeholder: t("Project title"),
//         editable: true,
//         validation: {
//           required: t("Name is required"),
//           minLength: {
//             value: 2,
//             message: t("name must be at least 2 characters"),
//           },
//           maxLength: {
//             value: 50,
//             message: t("name must be less than 50 characters"),
//           },
//         },
//       },
//       {
//         name: "description",
//         field_key: "description",
//         type: "text",
//         data_type: "text",
//         label: t("Description"),
//         placeholder: t("Description"),
//         editable: true,
//         validation: {
//           required: t("Description required"),
//         },
//       },
//       {
//         name: "location",
//         field_key: "location",
//         type: "text",
//         data_type: "text",
//         label: t("Location"),
//         placeholder: t("Location"),
//         editable: true,
//         validation: {
//           required: t("location is required"),
//           pattern: {
//             message: t("Invalid location"),
//           },
//         },
//       },

//       {
//         name: "file",
//         field_key: "file",
//         type: "file",
//         label: t("File"),
//         editable: true,
//         validation: {
//           required: t("File is required"),
//         },
//       },
//     ],
//   };
//   return (
//     <div className="container mx-auto">
//       {/* <Header fixed> */}
//       {/* <Search /> */}
//       <div className="ms-auto py-2 flex items-center space-x-4">
//       <div className="flex me-16 items-center ">
//         <Link to="/client">
//       <img src={"/logo.png"} className="w-10" />
//       </Link>
//        </div>
//         <LanguageSwitcher />
//         <ThemeSwitch />
//         <ProfileDropdown />
//         <SettingButton />
//       </div>
//       {/* </Header> */}
//       <Main>
//         <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">{t("Projects List")}</h2>
//             <p className="text-muted-foreground">{t("Manage your Projects here")}.</p>
//           </div>
//         </div>
//         <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
//           <GenericClientTable layout={layout} formConfig={formConfig} />
//         </div>
//       </Main>
//     </div>
//   );
// }

// export default Projects;


import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";

import { ThemeSwitch } from "@/components/theme-switch";
import { authAxios } from "@/http-config/authAxios";
import { endPoints } from "@/http-config/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import CostCell from "./CostCell";
import GenericClientTable, {
  ConfigType,
  FormConfig,
} from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import ServicesPopup from "../services/project-services/services-popup";

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
  const { isError } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const response = await authAxios.get(
        endPoints.projectEndpoint().pathname + "/get-all-project"
      );
      return response.data;
    },
  });

  const { isError: isErrorGetServcies } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const response = await authAxios.get(
        endPoints.servicesEndpoint().pathname + "/get-all-service"
      );
      return response.data;
    },
  });


  const layout: ConfigType<TProjectsService> = {
    name: "projects-service",
    get_endpoint: "/project-service/get-all-project-service",
    create_endpoint: endPoints.projectEndpoint().pathname + "/create-project",
    update_endpoint: "",
    delete_endpoint: "",
    update_key: "slug",
    delete_key: "slug",
    custom_key: "slug",
    title: t("Projects Service"),
    layout: "table",
    sortable: true,
    columns: [
      {
        type: "text",
        name: "id",
        label: t("ID"),
        data_type: "text",
        isSortingEnabled: false,
      },
      {
        type: "text",
        name: "title",
        label: t("Project Name"),
        data_type: "text",
      },
      {
        type: "text",
        name: "user.first_name",
        label: t("Supervisor Name"),
        data_type: "text",
      },
      {
        type: "text",
        name: "user.email",
        label: t("Supervisor Email"),
        data_type: "text",
      },
      {
        type: "text",
        name: "client.first_name",
        label: t("Client Name"),
        data_type: "text",
      },
      {
        type: "text",
        name: "client.email",
        label: t("Client Email"),
        data_type: "text",
      },
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
      {
        type: "text",
        name: "location",
        label: t("Location"),
        data_type: "text",
      },
      {
        type: "text",
        name: "quote_price",
        label: t("Quote Price"),
        data_type: "text",
      },
      {
        type: "custom",
        name: "cost",
        label: t("Cost"),
        component: (value: any, rowData: any) => (
          <CostCell value={value} rowData={rowData} />
        ),
      },
      { type: "text", name: "status", label: t("Status"), data_type: "text" },
    ],

    actions: [
        { key: "create", label: t("Add new project"), type: "button" },
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
  if (isError || isErrorGetServcies) navigate({ to: "/500" });
  return (
    <div className="container">
      {/* <Header fixed> */}
      {/* <Search /> */}
      <div className="ms-auto flex items-center space-x-4 m-3 container mx-auto">
        <LanguageSwitcher />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
      {/* </Header> */}
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("Projects Service List")}
            </h2>
            <p className="text-muted-foreground">
              {t("Manage your Projects Service here")}.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </div>
  );
}

export default ProjectsService;
