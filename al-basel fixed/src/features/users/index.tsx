
import GenericClientTable, { ConfigType, FormConfig } from "@/components/GenericClientTable";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTranslation } from "react-i18next";

type TUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};
export default function Users() {
  const { t } = useTranslation();

  const layout: ConfigType<TUser> = {
    name: "users",
    get_endpoint: "/user/get-all-user",
    create_endpoint: "/user/create-user",
    update_endpoint: "/user/update-user",
    delete_endpoint: "/user/delete-user",
    update_key: "id",
    delete_key: "id",
    title: t("Users"),
    layout: "table",
    sortable: true,
    columns: [
      // { type: "check" },
      { type: "text", name: "id", label: t("ID"), data_type: "text", isSortingEnabled: false },
      { type: "image", name: "avatar", label: t("Avatar") },

      {
        type: "text",
        name: "first_name",
        label: t("First name"),
        data_type: "text",
      },
      {
        type: "text",
        name: "last_name",
        label: t("Last name"),
        data_type: "text",
      },
      { type: "text", name: "email", label: t("Email"), data_type: "email" },
      { type: "text", name: "role", label: t("Role"), data_type: "text" },
      { type: "actions", name: "actions" },
    ],

    actions: [
      { key: "create", label: t("Create user"), type: "button" },
      {
        key: "edit",
        label: "Edit",
        type: "column",
        disabledId: "role",
      },
      {
        key: "delete",
        label: "Delete",
        type: "column",
        disabledId: "role",
      },
    ],
  };

  const formConfig: FormConfig = {
    name: "user-form",
    title: t("User"),
    fields: [
      {
        name: "first_name",
        field_key: "first_name",
        type: "text",
        data_type: "text",
        label: t("First name"),
        placeholder: t("First name"),
        editable: true,
        validation: {
          required: t("First name is required"),
          minLength: {
            value: 2,
            message: t("First name must be at least 2 characters"),
          },
          maxLength: {
            value: 50,
            message: t("First name must be less than 50 characters"),
          },
        },
      },
      {
        name: "last_name",
        field_key: "last_name",
        type: "text",
        data_type: "text",
        label: t("Last name"),
        placeholder: t("Last name"),
        editable: true,
        validation: {
          required: t("Last name is required"),
        },
      },
      {
        name: "email",
        field_key: "email",
        type: "text",
        data_type: "eamil",
        label: t("Email"),
        placeholder: t("Email"),
        editable: true,
        validation: {
          required: t("Email is required"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("Invalid email address"),
          },
        },
      },
      {
        name: "role",
        field_key: "role",
        type: "select",
        data: [
          // { label: "Admin", value: t("admin") },
          { label: "Employee", value: t("employee") },
          { label: "Client", value: t("client") },
        ],

        label: t("Role"),
        placeholder: t("Role"),
        editable: true,
        validation: {
          required: t("Role is required"),
        },
      },

      {
        name: "password",
        field_key: "password",
        type: "text",
        data_type: "password",
        label: t("Password"),
        placeholder: t("Password"),
        editable: true,
        edit_validation: {},
        validation: {
          required: t("Password is required"),
          minLength: {
            value: 8,
            message: t("Password must be at least 8 characters"),
          },
        },
      },
      {
        name: "image",
        field_key: "image",
        type: "image",
        label: t("Image"),
        editable: true,
        edit_validation: {},
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
            <h2 className="text-2xl font-bold tracking-tight">{t("User List")}</h2>
            <p className="text-muted-foreground">{t("Manage your users and their roles here")}.</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GenericClientTable layout={layout} formConfig={formConfig} />
        </div>
      </Main>
    </>
  );
}
