import { ColumnDef } from "@tanstack/react-table";
import { actionsColumn, checkColumn, imageColumn, textColumn, customColumn } from "./columnDefinitions";
import React from "react";

interface columnsLayout {
  isSortingEnabled?: boolean;
  name: string;
  label?: string;
  type: string;
  items?: any[];
  component?: any;
}

interface TableAction<T = any> {
  label: string | React.ReactNode;
  onClick: (data: T) => void;
}

export const getColumnConfig = (config: columnsLayout[], myActions?: TableAction[]): ColumnDef<any>[] => {
  return config
    .map((col) => {
      switch (col.type) {
        case "check":
          return checkColumn();

        case "text":
          return textColumn(col.name, {
            header: col.label,
            isSortingEnabled: col.isSortingEnabled,
          });

        case "image":
          return imageColumn(col.name, {
            header: col.label,
          });
        case "custom":
          return customColumn(col.name, {
            header: col.label,
            component: col.component,
          });

        case "actions":
          return actionsColumn(myActions ?? []);

        default:
          console.warn("Unknown column type:", col.type);
          return null;
      }
    })
    .filter((col): col is ColumnDef<any> => col !== null);
};
