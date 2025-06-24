
import GenericClientTable, { ConfigType, FormConfig } from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { endPoints } from "@/http-config/endpoints";
import { useTranslation } from "react-i18next";

type TService = {
  id: string;
  name: string;
  description: string;
  price: string;
  is_active: true;
  slug: string;
  image: string;
};
function Services() {
  const { t } = useTranslation();
  const layout: ConfigType<TService> = {
    name: "services",
    get_endpoint: endPoints.servicesEndpoint().pathname + "/get-all-service",
    create_endpoint: endPoints.servicesEndpoint().pathname + "/create-service",
    update_endpoint: endPoints.servicesEndpoint().pathname + "/update-service",
    delete_endpoint: endPoints.servicesEndpoint().pathname + "/delete-service",
    update_key: "slug",
    delete_key: "slug",
    title: t("Services"),
    layout: "table",
    sortable: true,
    columns: [
      // { type: "check" },
      { type: "text", name: "id", label: t("ID"), data_type: "text", isSortingEnabled: false },
      { type: "image", name: "image", label: t("Image") },
      { type: "text", name: "name", label: t("Name"), data_type: "text" },
      { type: "text", name: "price", label: t("Price"), data_type: "text" },
      {
        type: "text",
        name: "description",
        label: t("Description"),
        data_type: "text",
      },
      { type: "status", name: "is_active", label: t("Is active") },
      { type: "actions", name: "" },
    ],

    actions: [
      { key: "create", label: t("Add new service"), type: "button" },
      { key: "edit", label: t("Edit service"), type: "column" },
      { key: "delete", label: t("Delete service"), type: "column" },
    ],
  };
  const formConfig: FormConfig = {
    name: "service-form",
    title: t("service"),
    fields: [
      {
        name: "name",
        field_key: "name",
        type: "text",
        data_type: "text",
        label: t("Name"),
        placeholder: t("Service Name"),
        editable: true,
        validation: {
          required: t("Name is required"),
          minLength: {
            value: 2,
            message: t("Name must be at least 2 characters"),
          },
          maxLength: {
            value: 50,
            message: t("Name must be less than 50 characters"),
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
        name: "price",
        field_key: "price",
        type: "text",
        data_type: "number",
        label: t("Price"),
        placeholder: t("Price"),
        editable: true,
        validation: {
          required: t("Price is required"),
        },
      },

      {
        name: "image",
        field_key: "image",
        type: "image",
        label: t("Image"),
        editable: false,
        validation: {
          required: t("image is required"),
        },
      },
      {
        name: "is_active",
        field_key: "is_active",
        type: "boolean",
        label: t("Is active"),
        editable: true,
        validation: {},
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
            <h2 className="text-2xl font-bold tracking-tight">{t("Services List")}</h2>
            <p className="text-muted-foreground">{t("Manage your Services here")}.</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </>
  );
}

export default Services;
