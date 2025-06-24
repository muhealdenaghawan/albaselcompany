
import GenericClientTable, { ConfigType, FormConfig } from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTranslation } from "react-i18next";

type TMaterials = {
  id: string;
  name: string;
  quantity: string;
  is_available: boolean;
  role: string;
  slug: string;
};

export default function Materials() {
  const { t } = useTranslation();
  const layout: ConfigType<TMaterials> = {
    name: "materials",
    get_endpoint: "/material/get-all-material",
    create_endpoint: "/material/create-material",
    update_endpoint: "/material/update-material",
    delete_endpoint: "/material/delete-material",
    update_key: "slug",
    delete_key: "slug",
    title: "Materials",
    layout: "table",
    sortable: true,
    columns: [
      // { type: "check" },
      { type: "text", name: "id", label: t("ID"), data_type: "text", isSortingEnabled: false },
      { type: "image", name: "image", label: t("Image") },

      { type: "text", name: "name", label: t("Name"), data_type: "text" },
      { type: "text", name: "quantity", label: t("Quantity"), data_type: "number" },
      { type: "text", name: "is_available", label: t("Available"), data_type: "text" },
      { type: "actions", name: "actions" },
    ],

    actions: [
      { key: "create", label: t("Create material"), type: "button" },
      { key: "edit", label: t("Edit material"), type: "column" },
      { key: "delete", label: t("Delete material"), type: "column" },
    ],
  };

  const formConfig: FormConfig = {
    name: "material-form",
    title: t("Material"),
    fields: [
      {
        name: "name",
        field_key: "name",
        type: "text",
        data_type: "text",
        label: t("Material name"),
        placeholder: t("Material name"),
        editable: true,
        validation: {
          required: t("material name is required"),
          minLength: {
            value: 2,
            message: t("material name must be at least 2 characters"),
          },
          maxLength: {
            value: 50,
            message: t("material name must be less than 50 characters"),
          },
        },
      },
      {
        name: "quantity",
        field_key: "quantity",
        type: "text",
        data_type: "number",
        label: t("Quantity"),
        placeholder: t("Quantity"),
        editable: true,
        validation: {
          required: t("quantity is required"),
        },
        min: {
          value: 1,
          message: t("quantity must be at least 1"),
        },
      },

      {
        name: "is_available",
        field_key: "is_available",
        type: "boolean",
        label: t("Available"),
        editable: true,
        default: 0,
        validation: {},
      },
      {
        name: "image",
        field_key: "image",
        type: "image",
        label: t("Image"),
        editable: true,
        validation: {
          required: t("image is required"),
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
            <h2 className="text-2xl font-bold tracking-tight">{t("Materials List")}</h2>
            <p className="text-muted-foreground">{t("Manage your materials here")}.</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </>
  );
}
