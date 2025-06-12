import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Edit2, Trash } from "lucide-react";
import React, { useCallback, useState } from "react";
import { GenericDeleteHandler } from "./GenericDeleteHandler";
import { GenericForm } from "./GenericForm";
import { DataTableView } from "./data-table-view";


import { getColumnConfig } from "./getColumnConfig";
import { useTranslation } from "react-i18next";
import { useEntityList } from "@/http-config/useEntityList";

type BaseColumn = {
  name: string;
  label?: string;
  placeholder?: string;
  editable?: boolean;
  isSortingEnabled?: boolean;
};

type TextColumn = BaseColumn & {
  type: "text";
  data_type: "text" | "number" | "email" | "password";
};

type CurrencyColumn = BaseColumn & {
  type: "currency";
};

type StatusColumn = BaseColumn & {
  type: "status";
};

type DateColumn = BaseColumn & {
  type: "date" | "date_range";
};

type TextareaColumn = BaseColumn & {
  type: "memo";
};

type SelectColumn = BaseColumn & {
  type: "select";
  items: { value: string; id: string | number }[];
};

type ActionsColumn = BaseColumn & {
  type: "actions";
};
type ImageColumn = BaseColumn & {
  type: "image";
};
type Custom = BaseColumn & {
  type: "custom";
  component: (value: any, rowData: any) => React.ReactNode;
};

type ColumnDefinition =
  | TextColumn
  | ImageColumn
  | CurrencyColumn
  | StatusColumn
  | DateColumn
  | TextareaColumn
  | SelectColumn
  | ActionsColumn
  | Custom;

type CrudAction = {
  key: string;
  label: string;
  type: "column" | "button";
  path?: string;
  disabledId?: string;
};

export type ConfigType<T> = {
  name: string;
  get_endpoint: string;
  update_endpoint: string;
  create_endpoint: string;
  delete_endpoint: string;
  view_endpoint?: string;
  custom_key?: string;
  update_key: keyof T;
  delete_key: keyof T;
  title: string;
  sortable?: boolean;
  page_size?: number;
  columns: ColumnDefinition[];
  actions?: CrudAction[];
  layout: "table";
};

type FieldItem = {
  name: string;
  label: string;
  slug?: string;
  type: "text" | "textarea" | "number" | "select" | "file" | "date" | "image" | "boolean" | "checkbox" | "custom";
  component?: any;
  [key: string]: unknown;
  options?: { label: string; value: string | number }[];
  editable?: boolean;
};

export type FormConfig = {
  name: string;
  title: string;
  tabs?: {
    id: number;
    name: string;
    label: string;
    fields: FieldItem[];
  }[];
  fields?: FieldItem[];
  typeHeader?: "JSON" | "FORM_DATA ";
  dataBeforeSend?: Function;
};

type TableAction<T> = {
  label: string | React.ReactNode;
  onClick: (item: T) => void;
  disabledKey?: string;
};

declare type GenericClientTableProps<T extends { id: string | number }> = {
  layout: ConfigType<T>;
  formConfig: FormConfig;
};

export default function GenericClientTable<T extends { id: string | number; name?: string }>({
  layout,
  formConfig,
}: GenericClientTableProps<T>) {
  const [quaryStr, setQuaryStr] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const { data, isLoading, error, refetch, pagination } = useEntityList<T>({
    endpoint: layout.get_endpoint,
    query: quaryStr,
    page: currentPage,
    perPage: layout.page_size ?? 10,
  });
  console.log("data", data);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCreateSuccess = useCallback(() => {
    refetch();
    setOpenCreateDialog(false);
    setSelectedItem(null);
  }, [refetch]);

  const handleUpdateSuccess = useCallback(() => {
    refetch();
    setOpenUpdateDialog(false);
    setSelectedItem(null);
  }, [refetch]);

  const handleDeleteSuccess = useCallback(async () => {
    await refetch();
    setOpenDeleteDialog(false);
    setSelectedItem(null);
  }, [refetch]);

  const builtActions: TableAction<T>[] = (layout.actions ?? [])
    .map((action): TableAction<T> | null => {
      if (action.key === "edit" && action.type === "column") {
        return {
          label: (
            <>
              {action.label || t("Edit")}
              <DropdownMenuShortcut>
                <Edit2 size={16} />
              </DropdownMenuShortcut>
            </>
          ),
          onClick: (item: T) => handleEditButton(item),
          disabledKey: action.disabledId,
        };
      }
      if (action.key === "delete" && action.type === "column") {
        return {
          label: (
            <>
              {action.label || t("Delete")}
              <DropdownMenuShortcut>
                <Trash size={16} />
              </DropdownMenuShortcut>
            </>
          ),
          onClick: (item: T) => {
            setSelectedItem(item);
            setOpenDeleteDialog(true);
          },
          disabledKey: action.disabledId,
        };
      }
      return null;
    })
    .filter(Boolean) as TableAction<T>[];

  const columns = getColumnConfig(layout.columns, builtActions);

  const handleCreateButton = () => {
    setOpenCreateDialog(true);
  };

  const handleEditButton = (item: T) => {
    setSelectedItem(item);
    setOpenUpdateDialog(true);
  };

  return (
    <>
      {formConfig.fields && (
        <>
          <GenericForm
            mode="update"
            isOpen={openUpdateDialog}
            setIsOpen={setOpenUpdateDialog}
            onSuccess={handleUpdateSuccess}
            formConfig={formConfig}
            title={formConfig.title}
            slug={String(selectedItem?.[layout?.update_key] || "")}
            endpoint={layout.update_endpoint}
            fields={formConfig.fields.map((f) => ({
              ...f,
              name: f.name,
            }))}
            selectedItem={selectedItem}
          />
          <GenericForm
            mode="create"
            isOpen={openCreateDialog}
            formConfig={formConfig}
            setIsOpen={setOpenCreateDialog}
            onSuccess={handleCreateSuccess}
            endpoint={layout.create_endpoint}
            title={formConfig.title}
            fields={formConfig.fields.map((f) => ({
              ...f,
              name: f.name as string,
            }))}
          />
        </>
      )}

      {selectedItem && (
        <GenericDeleteHandler
          slug={String(selectedItem?.[layout.delete_key] || "")}
          name={selectedItem.name || `Item ${selectedItem.id}`}
          isOpen={openDeleteDialog}
          setIsOpen={setOpenDeleteDialog}
          onDeleteSuccess={handleDeleteSuccess}
          endpoint={layout.delete_endpoint}
          title={formConfig.title}
        />
      )}

      <DataTableView
        data={data}
        loading={isLoading}
        error={error ? error.message : ""}
        columns={columns}
        pageSize={layout.page_size ?? 12}
        customButton={true}
        customButtonText={`${t("Add")} ${formConfig.title}`}
        customButtonClick={handleCreateButton}
        sortable={layout.sortable}
        setQuaryStr={setQuaryStr}
        pagination={{
          currentPage: pagination.meta.current_page,
          totalPages: pagination.meta.last_page || 1,
          onPageChange: handlePageChange,
          hasNextPage: !!pagination.links.next,
          hasPrevPage: !!pagination.links.prev,
        }}
      />
    </>
  );
}
