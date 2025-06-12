import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";

interface TableData {
  id: string;
  [key: string]: string | number | boolean | Date | File | null;
}

interface Action<T> {
  label: string | React.ReactNode;
  onClick: (data: T) => void;
  disabledKey?: string;
}

// Function to get Nested value in object

function getNestedValue<T = unknown>(obj: Record<string, unknown> | null | undefined, path: string): T | null {
  if (obj == null) return null;

  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (typeof current !== "object" || current === null) return null;
    current = (current as Record<string, unknown>)[part];
  }

  return current as T;
}

// Function to format cell value based on its type
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return "-";

  if (typeof value === "object" && value !== null) {
    const obj = value as { name?: string; title?: string };
    if (obj.name) return obj.name;
    if (obj.title) return obj.title;
    return "[Object]";
  }

  return String(value);
}

// **Generic Select Column**
const checkColumn = <T extends TableData>(): ColumnDef<T> => ({
  id: "check",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <div className="flex-center">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    </div>
  ),
  enableSorting: false,
  enableHiding: false,
});

// **Generic Actions Column**
const actionsColumn = <T extends TableData>(actions: Action<T>[]): ColumnDef<T> => ({
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const data = row.original;

    return (
      <DropdownMenu modal={false}>
        <div className="text-center">
          <DropdownMenuTrigger asChild>
            <Button aria-label="Toggle" variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent align="end">
          {actions.map((action, index) => {
            const isDisabled = action.disabledKey ? data[action.disabledKey] === "admin" : false;

            return (
              <DropdownMenuItem
                key={index}
                onClick={() => !isDisabled && action.onClick(data)}
                className={cn("cursor-pointer hover:bg-gray-100", isDisabled && "opacity-50 cursor-not-allowed")}
                disabled={isDisabled}
              >
                {action.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});

// **Generic Image Column**
const imageColumn = <T extends TableData>(
  columnTitle: keyof T,
  options?: {
    imageWidth?: number;
    imageHeight?: number;
    header?: string;
  }
): ColumnDef<T> => {
  const { imageWidth = 40, imageHeight = 40, header } = options || {};

  return {
    accessorKey: String(columnTitle),
    header: header || String(columnTitle),
    cell: (props) => {
      const value = String(columnTitle).includes(".")
        ? getNestedValue(props.row.original, String(columnTitle))
        : props.row.getValue(String(columnTitle));

      if (!value) {
        return <div className="text-center">-</div>;
      }

      const imageUrl = value as string;

      return (
        <div className="flex-center">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Image"
            className="rounded-md object-cover"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </div>
      );
    },
    enableSorting: false,
  };
};

// **Generic Text Column**

const textColumn = <T extends TableData>(
  columnTitle: keyof T,
  options?: {
    isSortingEnabled?: boolean;
    header?: string;
    className?: string;
  }
): ColumnDef<T> => {
  const { isSortingEnabled = true, header, className } = options || {};

  return {
    accessorKey: String(columnTitle),
    header: header || String(columnTitle),
    cell: (props) => {
      const value = String(columnTitle).includes(".")
        ? getNestedValue(props.row.original, String(columnTitle))
        : props.row.getValue(String(columnTitle));

      return <div className={cn("flex-center px-2 text-sm", className)}>{formatCellValue(value)}</div>;
    },
    enableSorting: isSortingEnabled,
  };
};
// **Generic custom Column**

const customColumn = <T extends TableData>(
  columnTitle: keyof T,
  options: {
    isSortingEnabled?: boolean;
    component: (value: any, dataRow: any) => React.ReactNode;
    header?: string;
    className?: string;
  }
): ColumnDef<T> => {
  const { isSortingEnabled = true, header, component } = options || {};

  return {
    accessorKey: String(columnTitle),
    header: header || String(columnTitle),
    cell: (props) => {
      const value = String(columnTitle).includes(".")
        ? getNestedValue(props.row.original, String(columnTitle))
        : props.row.getValue(String(columnTitle));

      return component(value, props.row.original);
    },
    enableSorting: isSortingEnabled,
  };
};

export { actionsColumn, checkColumn, customColumn, formatCellValue, getNestedValue, imageColumn, textColumn };
